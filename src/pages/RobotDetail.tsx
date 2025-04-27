
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RobotCardProps } from "@/components/RobotCard";

// Mock data for a specific robot
const robotData: Record<string, RobotCardProps & {
  longDescription: string;
  features: string[];
  compatibility: string[];
  sellerName: string;
  sellerRating: number;
  sellerJoined: string;
  videoUrl?: string;
}> = {
  "1": {
    id: "1",
    title: "TrendWave Pro",
    description: "Advanced trend-following robot with intelligent entry and exit points. Optimized for major currency pairs.",
    longDescription: "TrendWave Pro is a sophisticated forex trading robot designed to identify and capitalize on trending market conditions. Using a proprietary algorithm that combines multiple technical indicators, it can accurately detect the beginning and end of trends across various timeframes. The robot uses dynamic position sizing based on market volatility and implements trailing stop loss mechanisms to protect your profits while letting winners run. With years of backtesting and optimization, TrendWave Pro has been fine-tuned to perform well across different market conditions while maintaining a conservative risk profile.",
    price: 299,
    rating: 4.5,
    tags: ["Trend", "Low Risk", "Major Pairs"],
    imageUrl: "/placeholder.svg",
    features: [
      "Adaptive trend detection algorithms",
      "Smart entry and exit points",
      "Dynamic position sizing",
      "Trailing stop loss functionality",
      "Multi-timeframe analysis",
      "Compatible with MT4 and MT5 platforms",
      "24/7 technical support",
      "Free updates for 1 year"
    ],
    compatibility: [
      "MetaTrader 4",
      "MetaTrader 5",
      "Windows 7/8/10/11",
      "VPS supported"
    ],
    sellerName: "TradeTech Solutions",
    sellerRating: 4.8,
    sellerJoined: "January 2021",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "2": {
    id: "2",
    title: "ScalpMaster Elite",
    description: "High-frequency scalping robot designed for quick in-and-out trades during volatile market conditions.",
    longDescription: "ScalpMaster Elite is a high-performance scalping robot built for traders who seek to capitalize on small price movements with high trading frequency. Using advanced market microstructure analysis, this robot identifies optimal entry points for quick trades with tight stop-loss and take-profit levels. It's specifically designed to operate effectively during high-volatility periods in the market, where quick price movements can be exploited for profit. The robot includes sophisticated risk management algorithms to protect your capital and prevent significant drawdowns.",
    price: 499,
    rating: 4.2,
    tags: ["Scalping", "High Frequency", "Volatile Markets"],
    imageUrl: "/placeholder.svg",
    features: [
      "Ultra-fast execution algorithms",
      "Specialized for high volatility periods",
      "Advanced risk management system",
      "Multiple scalping strategies in one package",
      "Customizable risk parameters",
      "Detailed trade logs and statistics",
      "Automatically adjusts to market conditions",
      "Low-latency optimization"
    ],
    compatibility: [
      "MetaTrader 4",
      "MetaTrader 5",
      "Windows 7/8/10/11",
      "Low-latency VPS recommended"
    ],
    sellerName: "Velocity Trading Systems",
    sellerRating: 4.6,
    sellerJoined: "March 2020"
  }
  // Additional robots would be defined here...
};

export default function RobotDetail() {
  const { id } = useParams<{ id: string }>();
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  
  // If robot not found, show not found message
  if (!id || !robotData[id]) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Robot Not Found</h1>
            <p className="mb-6 text-muted-foreground">The robot you're looking for doesn't exist or has been removed.</p>
            <Link to="/marketplace">
              <Button>Back to Marketplace</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const robot = robotData[id];
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Robot Images/Media */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              {robot.videoUrl ? (
                <iframe
                  src={robot.videoUrl}
                  className="w-full h-full"
                  title={`${robot.title} demo video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={robot.imageUrl}
                  alt={robot.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded bg-muted overflow-hidden"
                >
                  <img
                    src="/placeholder.svg"
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Robot Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap gap-2 mb-3">
              {robot.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{robot.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(robot.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {robot.rating.toFixed(1)} rating
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-6">${robot.price}</div>
              <p className="text-muted-foreground mb-4">{robot.description}</p>
              
              {isMessageVisible ? (
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Contact Seller</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You must be logged in to contact the seller.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to="/login" className="flex-1">
                        <Button className="w-full">Log In</Button>
                      </Link>
                      <Link to="/register" className="flex-1">
                        <Button variant="outline" className="w-full">Sign Up</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button 
                  className="w-full mb-4"
                  onClick={() => setIsMessageVisible(true)}
                >
                  Contact Seller
                </Button>
              )}
            </div>
            
            <div className="bg-card border rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{robot.sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{robot.sellerName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(robot.sellerRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      {robot.sellerRating.toFixed(1)}
                    </span>
                    <span>Member since {robot.sellerJoined}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for additional information */}
        <div className="mt-10">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 bg-card rounded-lg border mt-2">
              <p className="whitespace-pre-line">{robot.longDescription}</p>
            </TabsContent>
            <TabsContent value="features" className="p-4 bg-card rounded-lg border mt-2">
              <ul className="list-disc pl-5 space-y-2">
                {robot.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="compatibility" className="p-4 bg-card rounded-lg border mt-2">
              <h3 className="font-semibold mb-3">Compatible With:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {robot.compatibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 border-t mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
