import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RobotImageGallery } from "@/components/robot/RobotImageGallery";

type Platform = "mt4" | "mt5" | "ctrader";

interface RobotFormProps {
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

export function RobotForm({ initialData, mode }: RobotFormProps) {
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

  const [formData, setFormData] = useState(defaultData);
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create New Robot Listing" : "Edit Robot Listing"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <RobotImageGallery
            mainImage="/placeholder.svg"
            title={formData.title || "Robot Image"}
            images={formData.images || []}
            editable={true}
            onImagesUpdate={handleImagesUpdate}
            robotId={initialData?.id}
          />
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter robot name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your robot's features and benefits"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="199.00"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={handlePlatformChange}
            >
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mt4">MetaTrader 4</SelectItem>
                <SelectItem value="mt5">MetaTrader 5</SelectItem>
                <SelectItem value="ctrader">cTrader</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_description">Detailed Description</Label>
            <Textarea
              id="long_description"
              name="long_description"
              placeholder="Provide a detailed description of your robot's functionality, strategy, and unique selling points"
              value={formData.long_description}
              onChange={handleChange}
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              name="features"
              placeholder="Enter features (one per line)"
              value={formData.features.join("\n")}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compatibility">Compatibility (one per line)</Label>
            <Textarea
              id="compatibility"
              name="compatibility"
              placeholder="Enter compatibility requirements (one per line)"
              value={formData.compatibility.join("\n")}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/seller-dashboard")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
              ? "Create Listing"
              : "Update Listing"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
