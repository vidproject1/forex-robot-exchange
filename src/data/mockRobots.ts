import { RobotCardProps } from "@/types/robot";

export const allRobots: RobotCardProps[] = [
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

export const getAllTags = (robots: RobotCardProps[]): string[] => {
  return Array.from(new Set(robots.flatMap(robot => robot.tags || [])));
};
