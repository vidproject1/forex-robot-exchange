
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { RobotImageGallery } from "@/components/robot/RobotImageGallery";
import { RobotFormBasicInfo } from "./RobotFormBasicInfo";
import { RobotFormDetails } from "./RobotFormDetails";
import { useRobotForm } from "@/hooks/useRobotForm";
import { Platform } from "@/types/robot";

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
  const navigate = useNavigate();
  const {
    formData,
    isLoading,
    handleChange,
    handlePlatformChange,
    handleImagesUpdate,
    handleSubmit,
  } = useRobotForm({ initialData, mode });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create New Robot Listing" : "Edit Robot Listing"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <RobotImageGallery
            mainImage="/placeholder.svg"
            title={formData.title || "Robot Image"}
            images={formData.images || []}
            editable={true}
            onImagesUpdate={handleImagesUpdate}
            robotId={initialData?.id}
          />
          
          <RobotFormBasicInfo
            title={formData.title}
            description={formData.description}
            price={formData.price}
            platform={formData.platform}
            handleChange={handleChange}
            handlePlatformChange={handlePlatformChange}
          />

          <RobotFormDetails
            longDescription={formData.long_description || ""}
            features={formData.features}
            compatibility={formData.compatibility}
            handleChange={handleChange}
          />
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
