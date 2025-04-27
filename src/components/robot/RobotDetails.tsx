
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useRobotRating } from "@/hooks/useRobotRating";
import { RatingDialog } from "./RatingDialog";

interface RobotDetailsProps {
  id: string;
  title: string;
  platform?: string;
  tags?: string[];
  price: number;
  description: string;
}

export function RobotDetails({ 
  id,
  title, 
  platform, 
  tags = [], 
  price, 
  description 
}: RobotDetailsProps) {
  const {
    averageRating,
    userRating,
    isSubmitting,
    submitRating
  } = useRobotRating(id);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {platform && (
          <Badge key="platform" variant="secondary">
            {platform}
          </Badge>
        )}
        {tags?.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index <= averageRating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
        <RatingDialog
          onSubmit={submitRating}
          initialRating={userRating?.rating}
          initialComment={userRating?.comment}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="text-3xl font-bold mb-6">${price}</div>
      <p className="text-muted-foreground mb-4">{description}</p>
    </div>
  );
}
