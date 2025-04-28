import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useRobotRating } from "@/hooks/useRobotRating";

export interface RobotCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  tags?: string[];
  imageUrl?: string;
}

export function RobotCard({
  id,
  title,
  description,
  price,
  currency = "USD",
  tags = [],
  imageUrl = "/placeholder.svg"
}: RobotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { averageRating } = useRobotRating(id);
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-lg -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
          <Badge variant="secondary" className="font-medium">
            {currency} {price.toLocaleString()}
          </Badge>
        </div>
        <div className="flex gap-1 mt-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index <= (averageRating as number)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {(averageRating as number).toFixed(1)}
          </span>
        </div>
        <Link to={`/robot/${id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
