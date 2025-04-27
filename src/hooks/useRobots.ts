
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
        price: robot.price,
        rating: 4.5,
        tags: Array.isArray(robot.features) ? robot.features.slice(0, 3) : [],
        imageUrl: robot.images && robot.images.length > 0 ? robot.images[0] : "/placeholder.svg"
      })) as RobotCardProps[];
    }
  });
}
