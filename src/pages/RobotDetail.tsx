
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { RobotCardProps } from "@/types/robot";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RobotImageGallery } from "@/components/robot/RobotImageGallery";
import { RobotDetails } from "@/components/robot/RobotDetails";
import { ContactSeller } from "@/components/robot/ContactSeller";
import { SellerProfile } from "@/components/robot/SellerProfile";
import { RobotDetailTabs } from "@/components/robot/RobotDetailTabs";

export default function RobotDetail() {
  const { id } = useParams<{ id: string }>();
  const [robot, setRobot] = useState<RobotCardProps & {
    platform?: string;
    features?: string[];
    compatibility?: string[];
    long_description?: string;
    seller_id?: string;
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
            imageUrl: "/placeholder.svg",
            platform: robotData.platform,
            features: robotData.features || [],
            compatibility: robotData.compatibility || [],
            seller_id: robotData.seller_id,
            tags: [],
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4">Loading Robot Details...</h1>
          </div>
        </div>
      </div>
    );
  }
  
  if (!robot) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Robot Not Found</h1>
            <p className="mb-6 text-muted-foreground">The robot you're looking for doesn't exist or has been removed.</p>
            <Link to="/marketplace">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <RobotImageGallery mainImage={robot.imageUrl} title={robot.title} />
          </div>
          
          <div className="w-full lg:w-1/2">
            <RobotDetails
              title={robot.title}
              platform={robot.platform}
              tags={robot.tags}
              rating={robot.rating}
              price={robot.price}
              description={robot.description}
            />
            
            <ContactSeller />
            
            <SellerProfile 
              username={sellerProfile?.username}
              createdAt={sellerProfile?.created_at}
            />
          </div>
        </div>
        
        <div className="mt-10">
          <RobotDetailTabs
            description={robot.description}
            longDescription={robot.long_description}
            features={robot.features}
            compatibility={robot.compatibility}
          />
        </div>
      </main>
      
      <footer className="py-10 px-4 md:px-6 border-t mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
