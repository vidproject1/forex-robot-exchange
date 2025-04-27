import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { RobotsGrid } from "@/components/marketplace/RobotsGrid";
import { RobotCardProps } from "@/types/robot";
import { allRobots, getAllTags } from "@/data/mockRobots";

export default function Marketplace() {
  const [robots, setRobots] = useState(allRobots);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [activeFilters, setActiveFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const allTags = getAllTags(allRobots);

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
