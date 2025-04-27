
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RatingData {
  rating: number;
  comment?: string;
}

export function useRobotRating(robotId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: averageRating = 0, isLoading: isLoadingRating } = useQuery({
    queryKey: ['robot-rating', robotId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_robot_rating', {
        robot_id: robotId
      });

      if (error) throw error;
      return data || 0;
    }
  });

  const { data: userRating, isLoading: isLoadingUserRating } = useQuery({
    queryKey: ['user-rating', robotId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('robot_ratings')
        .select('rating, comment')
        .eq('robot_id', robotId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rating found
        throw error;
      }

      return data;
    }
  });

  const submitRating = async (ratingData: RatingData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in to rate');

      const { error } = await supabase
        .from('robot_ratings')
        .upsert({
          robot_id: robotId,
          user_id: user.id,
          rating: ratingData.rating,
          comment: ratingData.comment
        });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['robot-rating', robotId] });
      queryClient.invalidateQueries({ queryKey: ['user-rating', robotId] });

      toast({
        title: 'Rating submitted',
        description: 'Thank you for your feedback!',
      });
    } catch (error: any) {
      toast({
        title: 'Error submitting rating',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    averageRating,
    userRating,
    isLoading: isLoadingRating || isLoadingUserRating,
    isSubmitting,
    submitRating
  };
}
