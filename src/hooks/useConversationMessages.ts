
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";

export function useConversationMessages(conversationId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    if (!conversationId) return;

    // Subscribe to new messages in this conversation
    const channel = supabase
      .channel('conversation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversation_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('New message received via real-time:', payload);
          
          // Instead of just invalidating the query, we can update the cache directly
          queryClient.setQueryData(
            ['conversation', conversationId, 'messages'],
            (oldData: Message[] | undefined) => {
              if (!oldData) return [transformMessagePayload(payload.new, user?.id)];
              
              // Check if message already exists in cache (avoid duplicates from optimistic updates)
              const messageExists = oldData.some(msg => msg.id === payload.new.id);
              if (messageExists) return oldData;
              
              return [...oldData, transformMessagePayload(payload.new, user?.id)];
            }
          );
        }
      )
      .subscribe();

    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient, user?.id]);

  // Function to transform message payload to Message type
  const transformMessagePayload = (msg: any, userId?: string): Message => ({
    id: msg.id,
    content: msg.content,
    sender: msg.sender_id === userId ? "user" : "other",
    timestamp: new Date(msg.created_at),
  });

  // Query for fetching messages
  const query = useQuery({
    queryKey: ['conversation', conversationId, 'messages'],
    queryFn: async () => {
      if (!user || !conversationId) throw new Error("Missing required data");

      const { data: messages, error: messagesError } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      return messages.map((msg): Message => transformMessagePayload(msg, user.id));
    },
    enabled: !!user && !!conversationId,
  });

  // Mutation for sending messages
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !conversationId) throw new Error("Missing required data");
      
      const { data, error } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onMutate: async (newMessageContent) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['conversation', conversationId, 'messages']
      });

      // Snapshot the previous messages
      const previousMessages = queryClient.getQueryData([
        'conversation', conversationId, 'messages'
      ]);

      // Create optimistic message
      const optimisticMessage: Message = {
        id: `temp-${uuidv4()}`,
        content: newMessageContent,
        sender: "user",
        timestamp: new Date(),
      };

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['conversation', conversationId, 'messages'],
        (old: Message[] | undefined) => [...(old || []), optimisticMessage]
      );

      // Also update the last message in the conversation list
      queryClient.setQueryData(
        ['conversations'],
        (old: any[] | undefined) => {
          if (!old) return old;
          return old.map(chat => {
            if (chat.id === conversationId) {
              return {
                ...chat,
                lastMessage: newMessageContent,
                timestamp: new Date()
              };
            }
            return chat;
          });
        }
      );

      return { previousMessages, optimisticMessage };
    },
    onError: (err, newMessage, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ['conversation', conversationId, 'messages'],
        context?.previousMessages
      );
      
      console.error("Error sending message:", err);
    },
    onSettled: () => {
      // Always refetch after error or success to make sure our local data is correct
      queryClient.invalidateQueries({
        queryKey: ['conversation', conversationId, 'messages']
      });
      
      // Also refetch the conversation list to update last message
      queryClient.invalidateQueries({
        queryKey: ['conversations']
      });
    },
  });

  return {
    ...query,
    sendMessage,
  };
}
