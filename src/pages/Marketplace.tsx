
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { RobotsGrid } from "@/components/marketplace/RobotsGrid";
import { RobotCardProps, SortOption } from "@/types/robot";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Marketplace() {
  const [robots, setRobots] = useState<RobotCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [activeFilters, setActiveFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const { toast } = useToast();

  // Fetch robots from Supabase
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        let query = supabase
          .from("robots")
          .select("*")
          .eq("active", true)
          .gte("price", priceRange[0])
          .lte("price", priceRange[1]);

        // Apply search filter if query exists
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }

        // Apply sorting
        switch (sortOption) {
          case "price-asc":
            query = query.order("price", { ascending: true });
            break;
          case "price-desc":
            query = query.order("price", { ascending: false });
            break;
          case "newest":
            query = query.order("created_at", { ascending: false });
            break;
          default:
            query = query.order("created_at", { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;

        // Transform the data to match RobotCardProps
        const transformedRobots: RobotCardProps[] = data.map(robot => ({
          id: robot.id,
          title: robot.title,
          description: robot.description,
          price: robot.price,
          imageUrl: robot.images && robot.images.length > 0 ? robot.images[0] : "/placeholder.svg",
          tags: Array.isArray(robot.features) ? robot.features.slice(0, 3) : [],
          rating: 4.5,
        }));

        setRobots(transformedRobots);
      } catch (error: any) {
        console.error("Error fetching robots:", error);
        toast({
          title: "Error",
          description: "Failed to load robots. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRobots();
  }, [priceRange, searchQuery, sortOption, toast]);

  // Get all unique tags from robots
  const allTags = Array.from(new Set(robots.flatMap(robot => robot.tags || [])));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy as SortOption);
  };

  const resetFilters = () => {
    setPriceRange([0, 600]);
    setSelectedTags([]);
    setMinRating(0);
    setSearchQuery("");
    setSortOption("newest");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-muted-foreground">Loading robots...</p>
          </div>
        </main>
      </div>
    );
  }

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
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            minRating={minRating}
            setMinRating={setMinRating}
            allTags={allTags}
            onReset={resetFilters}
            activeFilters={activeFilters}
          />
          
          <div className="flex-1">
            <RobotsGrid robots={robots} onReset={resetFilters} />
          </div>
        </div>
      </main>
      
      <footer className="py-10 px-4 md:px-6 border-t mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
