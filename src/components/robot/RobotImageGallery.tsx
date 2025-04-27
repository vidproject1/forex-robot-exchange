
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface RobotImageGalleryProps {
  mainImage: string;
  title: string;
  robotId?: string;
  images?: string[];
  editable?: boolean;
  onImagesUpdate?: (images: string[]) => void;
}

export function RobotImageGallery({ 
  mainImage, 
  title, 
  robotId,
  images = [],
  editable = false,
  onImagesUpdate
}: RobotImageGalleryProps) {
  const { uploadImage, isUploading } = useImageUpload();
  const { toast } = useToast();
  const [currentImages, setCurrentImages] = useState<string[]>(images);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      const updatedImages = [...currentImages, imageUrl];
      setCurrentImages(updatedImages);
      onImagesUpdate?.(updatedImages);

      if (robotId) {
        const { error } = await supabase
          .from('robots')
          .update({ images: updatedImages })
          .eq('id', robotId);

        if (error) {
          toast({
            title: "Error updating robot images",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Image uploaded successfully",
            description: "Your image has been added to the gallery",
          });
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
        <img
          src={currentImages[0] || mainImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded bg-muted overflow-hidden"
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {editable && currentImages.length < 4 && (
          <div className="aspect-square rounded bg-muted flex items-center justify-center">
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex items-center justify-center">
              <Button 
                variant="ghost" 
                disabled={isUploading}
                className="w-full h-full flex flex-col gap-2"
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="w-6 h-6" />
                {isUploading ? 'Uploading...' : 'Add Image'}
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
