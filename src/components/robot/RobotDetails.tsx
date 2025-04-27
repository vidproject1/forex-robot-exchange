
import { Badge } from "@/components/ui/badge";

interface RobotDetailsProps {
  title: string;
  platform?: string;
  tags?: string[];
  rating?: number;
  price: number;
  description: string;
}

export function RobotDetails({ 
  title, 
  platform, 
  tags = [], 
  rating = 4.5, 
  price, 
  description 
}: RobotDetailsProps) {
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
      
      <div className="flex items-center mb-4">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating.toFixed(1)} rating
          </span>
        </div>
      </div>
      
      <div className="text-3xl font-bold mb-6">${price}</div>
      <p className="text-muted-foreground mb-4">{description}</p>
    </div>
  );
}
