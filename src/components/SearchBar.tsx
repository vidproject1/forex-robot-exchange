
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSortChange: (sortBy: string) => void;
}

export function SearchBar({ onSearch, onSortChange }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search robots..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSortChange("price-asc")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("price-desc")}>
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("rating-desc")}>
              Highest Rated
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("newest")}>
              Newest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
