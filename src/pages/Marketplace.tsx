import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { RobotCard, RobotCardProps } from "@/components/RobotCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Mock data for robots (expanded from previous)
const allRobots: RobotCardProps[] = [
  {
    id: "1",
    title: "TrendWave Pro",
    description: "Advanced trend-following robot with intelligent entry and exit points. Optimized for major currency pairs.",
    price: 299,
    rating: 4.5,
    tags: ["Trend", "Low Risk", "Major Pairs"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "ScalpMaster Elite",
    description: "High-frequency scalping robot designed for quick in-and-out trades during volatile market conditions.",
    price: 499,
    rating: 4.2,
    tags: ["Scalping", "High Frequency", "Volatile Markets"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Reversal Oracle",
    description: "Identifies potential market reversals using a combination of indicators and price action analysis.",
    price: 399,
    rating: 3.8,
    tags: ["Reversals", "Indicators", "All Pairs"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Grid Trader Pro",
    description: "Implements a grid trading strategy to capitalize on ranging markets with multiple entry and exit points.",
    price: 349,
    rating: 4.0,
    tags: ["Grid", "Ranging Markets", "Multi-Entry"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "NewsHunter",
    description: "Specially designed to trade economic news releases with adjustable risk parameters and instant execution.",
    price: 599,
    rating: 4.7,
    tags: ["News Trading", "Fast Execution", "High Risk"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Pattern Scanner",
    description: "Scans the market for high-probability chart patterns and executes trades based on historical performance.",
    price: 449,
    rating: 4.1,
    tags: ["Patterns", "Technical Analysis", "All Timeframes"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Momentum Hunter",
    description: "Identifies and trades strong market momentum with built-in stop-loss and take-profit mechanisms.",
    price: 379,
    rating: 4.3,
    tags: ["Momentum", "Medium Risk", "All Pairs"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "8",
    title: "Volatility Breakout",
    description: "Capitalizes on price breakouts after periods of low volatility. Perfect for range-bound markets.",
    price: 329,
    rating: 3.9,
    tags: ["Breakout", "Volatility", "Range Markets"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "9",
    title: "Hedge Master",
    description: "Advanced hedging strategy implementation for protecting positions during uncertain market conditions.",
    price: 549,
    rating: 4.4,
    tags: ["Hedging", "Low Risk", "All Markets"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "10",
    title: "Support Resistance Bot",
    description: "Automatically identifies key support and resistance levels and executes trades at optimal price points.",
    price: 419,
    rating: 4.0,
    tags: ["Support/Resistance", "Technical", "Medium Risk"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "11",
    title: "Ichimoku Cloud Trader",
    description: "Based on the Ichimoku Cloud indicator system, this robot provides comprehensive market analysis and trading signals.",
    price: 469,
    rating: 4.2,
    tags: ["Ichimoku", "Indicators", "Japanese"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "12",
    title: "Martingale Expert",
    description: "Implements a controlled martingale strategy with risk management features to prevent large drawdowns.",
    price: 289,
    rating: 3.5,
    tags: ["Martingale", "High Risk", "Risk Management"],
    imageUrl: "/placeholder.svg"
  }
];

// Get all unique tags
const allTags = Array.from(new Set(allRobots.flatMap(robot => robot.tags || [])));

export default function Marketplace() {
  const [robots, setRobots] = useState(allRobots);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [activeFilters, setActiveFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Apply filters
  useEffect(() => {
    let filtered = [...allRobots];
    
    // Filter by price range
    filtered = filtered.filter(
      (robot) => robot.price >= priceRange[0] && robot.price <= priceRange[1]
    );
    
    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter((robot) => (robot.rating || 0) >= minRating);
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((robot) =>
        robot.tags?.some((tag) => selectedTags.includes(tag))
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (robot) =>
          robot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          robot.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // 'newest' - keep original order
        break;
    }
    
    setRobots(filtered);
    
    // Check if any filters are active
    setActiveFilters(
      priceRange[0] > 0 ||
      priceRange[1] < 600 ||
      minRating > 0 ||
      selectedTags.length > 0 ||
      !!searchQuery
    );
  }, [priceRange, selectedTags, minRating, searchQuery, sortOption]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 600]);
    setSelectedTags([]);
    setMinRating(0);
    setSearchQuery("");
    setSortOption("newest");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Robot Marketplace</h1>
        <p className="text-muted-foreground mb-8">
          Browse and find the perfect forex robot for your trading strategy
        </p>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {activeFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs h-8"
                  >
                    Reset All
                  </Button>
                )}
              </div>
              
              {/* Price Range Filter */}
              <div className="space-y-4 pb-4 border-b">
                <h4 className="font-medium">Price Range</h4>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={600}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="space-y-4 py-4 border-b">
                <h4 className="font-medium">Minimum Rating</h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() =>
                          setMinRating(minRating === rating ? 0 : rating)
                        }
                      />
                      <Label htmlFor={`rating-${rating}`} className="ml-2 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">
                          & up
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Robots Grid */}
          <div className="flex-1">
            {robots.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No robots found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {robots.map((robot) => (
                  <RobotCard key={robot.id} {...robot} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 border-t mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
