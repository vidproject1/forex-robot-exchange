
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Platform } from "@/types/robot";

interface RobotFormData {
  title: string;
  description: string;
  price: number;
  platform: Platform;
  features: string[];
  compatibility: string[];
  long_description?: string;
  images: string[];
}

interface UseRobotFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    price: number;
    platform: Platform;
    features?: string[];
    compatibility?: string[];
    long_description?: string;
    images?: string[];
  };
  mode: "create" | "edit";
}

export function useRobotForm({ initialData, mode }: UseRobotFormProps) {
  const defaultData = {
    title: "",
    description: "",
    price: 199,
    platform: "mt4" as Platform,
    features: [],
    compatibility: [],
    long_description: "",
    images: [],
    ...initialData,
  };

  const [formData, setFormData] = useState<RobotFormData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "features" || name === "compatibility") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split("\n").filter((item) => item.trim() !== ""),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handlePlatformChange = (value: Platform) => {
    setFormData((prev) => ({
      ...prev,
      platform: value,
    }));
  };

  const handleImagesUpdate = (newImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create or edit listings.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const robotData = {
        title: formData.title,
        description: formData.description,
        long_description: formData.long_description,
        price: formData.price,
        platform: formData.platform,
        features: formData.features,
        compatibility: formData.compatibility,
        seller_id: user.id,
        images: formData.images,
      };

      if (mode === "create") {
        const { error } = await supabase.from("robots").insert(robotData);
        if (error) throw error;

        toast({
          title: "Success!",
          description: "Your robot has been listed successfully.",
        });
      } else if (mode === "edit" && initialData?.id) {
        const { error } = await supabase
          .from("robots")
          .update(robotData)
          .eq("id", initialData.id)
          .eq("seller_id", user.id);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Your robot has been updated successfully.",
        });
      }

      navigate("/seller-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handlePlatformChange,
    handleImagesUpdate,
    handleSubmit,
  };
}
