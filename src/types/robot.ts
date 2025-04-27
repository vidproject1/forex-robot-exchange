
export interface RobotCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  tags?: string[];
  imageUrl?: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating-desc";

// Define the Platform type for use throughout the app
export type Platform = "mt4" | "mt5" | "ctrader";
