
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { RobotForm } from "@/components/seller/RobotForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/AuthContext";

interface Robot {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: string;
  seller_id: string;
}

export default function EditRobotListing() {
  const { id } = useParams<{ id: string }>();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, accountType } = useAuth();

  useEffect(() => {
    if (!user || accountType !== "seller") {
      navigate("/login");
      return;
    }

    const fetchRobot = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("robots")
          .select("*")
          .eq("id", id)
          .eq("seller_id", user.id)
          .single();

        if (error) throw error;

        if (!data) {
          toast({
            title: "Listing not found",
            description: "This listing doesn't exist or you don't have permission to edit it.",
            variant: "destructive",
          });
          navigate("/seller-dashboard");
          return;
        }

        setRobot(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        navigate("/seller-dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobot();
  }, [id, user, accountType, navigate, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!robot) {
    return <div>Robot not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Robot Listing</h1>
        <RobotForm
          initialData={{
            id: robot.id,
            title: robot.title,
            description: robot.description,
            price: robot.price,
            platform: robot.platform,
          }}
          mode="edit"
        />
      </main>
    </div>
  );
}
