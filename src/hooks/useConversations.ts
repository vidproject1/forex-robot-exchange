
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
          ),
          profiles!conversations_buyer_id_fkey (
            username,
            avatar_url
          )
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (convoError) throw convoError;

      const formattedConversations: Chat[] = conversations.map((conversation) => {
        const isUserBuyer = conversation.buyer_id === user.id;
        const otherUser = conversation.profiles;
        
        return {
          id: conversation.id,
          user: {
            name: otherUser?.username || 'Unknown User',
            avatarUrl: otherUser?.avatar_url || '',
            initials: (otherUser?.username?.charAt(0) || 'U').toUpperCase(),
          },
          messages: [],
          lastMessage: '',
          unread: false,
          timestamp: new Date(conversation.updated_at),
        };
      });

      return formattedConversations;
    },
    enabled: !!user,
  });
}
