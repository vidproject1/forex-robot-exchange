
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Chat } from "@/types/chat";

export function useConversations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      // First, get all conversations the user is part of
      const { data: conversations, error: convoError } = await supabase
        .from('conversations')
        .select(`
          id,
          robot_id,
          buyer_id,
          seller_id,
          created_at,
          updated_at,
          robots (
            title,
            seller_id
          )
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (convoError) throw convoError;

      // For each conversation, get the other user's profile
      const formattedConversations: Chat[] = await Promise.all(conversations.map(async (conversation) => {
        const isUserBuyer = conversation.buyer_id === user.id;
        const otherUserId = isUserBuyer ? conversation.seller_id : conversation.buyer_id;
        
        // Fetch the other user's profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', otherUserId)
          .single();
        
        // Get the most recent message for this conversation
        const { data: recentMessages } = await supabase
          .from('conversation_messages')
          .select('content, created_at')
          .eq('conversation_id', conversation.id)
          .order('created_at', { ascending: false })
          .limit(1);

        const lastMessage = recentMessages && recentMessages.length > 0 
          ? recentMessages[0].content 
          : '';
        
        return {
          id: conversation.id,
          user: {
            name: profileData?.username || 'Unknown User',
            avatarUrl: profileData?.avatar_url || '',
            initials: (profileData?.username?.charAt(0) || 'U').toUpperCase(),
          },
          messages: [],
          lastMessage,
          unread: false,
          timestamp: new Date(conversation.updated_at),
        };
      }));

      return formattedConversations;
    },
    enabled: !!user,
  });
}
