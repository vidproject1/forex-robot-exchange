import { useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { RobotCard, RobotCardProps } from "@/components/RobotCard";

// Mock data for robots
const mockRobots: RobotCardProps[] = [
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
  }
];

export default function Index() {
  const [filteredRobots, setFilteredRobots] = useState(mockRobots);
  const [sortOption, setSortOption] = useState("newest");

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredRobots(mockRobots);
      return;
    }

    const filtered = mockRobots.filter((robot) => 
      robot.title.toLowerCase().includes(query.toLowerCase()) || 
      robot.description.toLowerCase().includes(query.toLowerCase()) ||
      robot.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRobots(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
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
        // In a real app, this would sort by creation date
        // For now, we'll keep the original order
        sorted = [...mockRobots];
        break;
      default:
        break;
    }
    
    setFilteredRobots(sorted);
  };

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
            {filteredRobots.map((robot) => (
              <RobotCard key={robot.id} {...robot} />
            ))}
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
