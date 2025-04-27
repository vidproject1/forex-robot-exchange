
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { RobotCardProps } from "@/types/robot";

export function useRobots() {
  return useQuery({
    queryKey: ['robots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('robots')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(robot => ({
        id: robot.id,
        title: robot.title,
        description: robot.description,
        price: robot.price, // Remove parseFloat to avoid type mismatch
        rating: 4.5, // Default rating until we implement a rating system
        tags: Array.isArray(robot.features) ? robot.features.slice(0, 3) : [],
        imageUrl: "/placeholder.svg" // Default image until we implement image uploads
      })) as RobotCardProps[];
    }
  });
}
