import { useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { RobotCard } from "@/components/RobotCard";
import { useRobots } from "@/hooks/useRobots";
import type { SortOption } from "@/types/robot";

export default function Index() {
  const { data: robots = [] } = useRobots();
  const [filteredRobots, setFilteredRobots] = useState(robots);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  useState(() => {
    setFilteredRobots(robots);
  }, [robots]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredRobots(robots);
      return;
    }

    const filtered = robots.filter((robot) => 
      robot.title.toLowerCase().includes(query.toLowerCase()) || 
      robot.description.toLowerCase().includes(query.toLowerCase()) ||
      robot.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRobots(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy as SortOption);
    let sorted = [...filteredRobots];
    
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        sorted = [...robots];
        break;
      default:
        break;
    }
    
    setFilteredRobots(sorted);
  };

  const displayedRobots = filteredRobots.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find the Perfect <span className="text-primary">Forex Robot</span> for Your Trading Strategy
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-muted-foreground">
            Connect with sellers offering powerful automated trading solutions. Browse, compare, and find the forex robot that fits your trading needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/marketplace">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Robots Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Robots</h2>
              <p className="text-muted-foreground">Discover top-performing trading solutions</p>
            </div>
            <Link to="/marketplace" className="mt-4 md:mt-0">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {displayedRobots.map((robot) => (
              <RobotCard key={robot.id} {...robot} />
            ))}
            {displayedRobots.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No robots found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Browse Robots</h3>
              <p className="text-muted-foreground">
                Search through our marketplace to find robots that match your trading style and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Contact Sellers</h3>
              <p className="text-muted-foreground">
                Use our secure messaging system to ask questions and negotiate with robot creators.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Complete Purchase</h3>
              <p className="text-muted-foreground">
                Arrange payment directly with the seller and receive your forex robot.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 lg:px-8 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">ForexRobotX</h3>
              <p className="text-muted-foreground mt-2">The marketplace for forex trading robots.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Link to="/marketplace" className="hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/login" className="hover:text-primary transition-colors">
                Log In
              </Link>
              <Link to="/register" className="hover:text-primary transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
