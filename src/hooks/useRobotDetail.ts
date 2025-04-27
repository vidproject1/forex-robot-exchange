
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RobotCardProps } from "@/types/robot";

interface UseRobotDetailReturn {
  robot: (RobotCardProps & {
    platform?: string;
    features?: string[];
    compatibility?: string[];
    long_description?: string;
    seller_id?: string;
    images?: string[];
  }) | undefined;
  sellerProfile: {
    username: string;
    account_type: string;
    created_at: string;
  } | null;
  isLoading: boolean;
}

export function useRobotDetail(id: string | undefined): UseRobotDetailReturn {
  const [robot, setRobot] = useState<RobotCardProps & {
    platform?: string;
    features?: string[];
    compatibility?: string[];
    long_description?: string;
    seller_id?: string;
    images?: string[];
  }>();
  const [sellerProfile, setSellerProfile] = useState<{
    username: string;
    account_type: string;
    created_at: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRobotDetails = async () => {
      if (!id) return;

      try {
        const { data: robotData, error: robotError } = await supabase
          .from("robots")
          .select("*")
          .eq("id", id)
          .single();

        if (robotError) throw robotError;

        if (robotData) {
          const { data: sellerData, error: sellerError } = await supabase
            .from("profiles")
            .select("username, account_type, created_at")
            .eq("id", robotData.seller_id)
            .single();

          if (sellerError) throw sellerError;

          setSellerProfile(sellerData);

          const transformedRobot = {
            id: robotData.id,
            title: robotData.title,
            description: robotData.description,
            long_description: robotData.long_description,
            price: robotData.price,
            imageUrl: robotData.images && robotData.images.length > 0 
              ? robotData.images[0] 
              : "/placeholder.svg",
            platform: robotData.platform,
            features: robotData.features || [],
            compatibility: robotData.compatibility || [],
            seller_id: robotData.seller_id,
            images: robotData.images || [],
            tags: Array.isArray(robotData.features) ? robotData.features.slice(0, 3) : [],
            rating: 4.5,
          };

          setRobot(transformedRobot);
        }
      } catch (error: any) {
        console.error("Error fetching robot details:", error);
        toast({
          title: "Error",
          description: "Failed to load robot details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobotDetails();
  }, [id, toast]);

  return { robot, sellerProfile, isLoading };
}
