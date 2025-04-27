
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  allTags: string[];
  onReset: () => void;
  activeFilters: boolean;
}

export function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedTags,
  setSelectedTags,
  minRating,
  setMinRating,
  allTags,
  onReset,
  activeFilters,
}: FilterSidebarProps) {
  const handleTagToggle = (tag: string) => {
    // Fix: Create a new array directly instead of using a function that returns an array
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
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
              onValueChange={(value) => setPriceRange(value as [number, number])}
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
  );
}
