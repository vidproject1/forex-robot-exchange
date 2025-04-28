
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RatingData {
  rating: number;
  comment?: string;
}

interface UserRating {
  rating: number;
  comment?: string | null;
}

export function useRobotRating(robotId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the average rating for a robot
  const { data: averageRating = 0, isLoading: isLoadingRating } = useQuery({
    queryKey: ['robot-rating', robotId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.rpc('get_robot_rating', {
          robot_id: robotId
        });

        if (error) throw error;
        return data || 0;
      } catch (error) {
        console.error('Error fetching rating:', error);
        return 0;
      }
    }
  });

  // Get the user's rating for a robot if they have one
  const { data: userRating, isLoading: isLoadingUserRating } = useQuery({
    queryKey: ['user-rating', robotId],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Instead of direct table access, we can create a view or function
        // For now, we'll simulate this by returning a default value
        // You'll need to create a database function to actually retrieve user ratings
        
        // Placeholder return until DB is set up
        return null as UserRating | null;
      } catch (error) {
        console.error('Error fetching user rating:', error);
        return null;
      }
    }
  });

  const submitRating = async (ratingData: RatingData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in to rate');

      // Call the upsert_robot_rating function
      const { error } = await supabase.rpc('upsert_robot_rating', {
        p_robot_id: robotId,
        p_rating: ratingData.rating,
        p_comment: ratingData.comment || null
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
