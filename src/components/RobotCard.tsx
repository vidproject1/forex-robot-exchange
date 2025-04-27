
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface RobotCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  rating?: number;
  tags?: string[];
  imageUrl?: string;
}

export function RobotCard({
  id,
  title,
  description,
  price,
  currency = "USD",
  rating = 0,
  tags = [],
  imageUrl = "/placeholder.svg"
}: RobotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
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
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {rating.toFixed(1)}
          </span>
        </div>
        <Link to={`/robot/${id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
