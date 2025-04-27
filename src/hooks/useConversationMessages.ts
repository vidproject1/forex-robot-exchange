
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/chat";

export function useConversationMessages(conversationId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['conversation', conversationId, 'messages'],
    queryFn: async () => {
      if (!user || !conversationId) throw new Error("Missing required data");

      const { data: messages, error: messagesError } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      return messages.map((msg): Message => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender_id === user.id ? "user" : "other",
        timestamp: new Date(msg.created_at),
      }));
    },
    enabled: !!user && !!conversationId,
  });
}
