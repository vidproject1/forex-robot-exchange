
import { Chat } from "@/types/chat";

export const mockChats: Chat[] = [
  {
    id: "1",
    user: {
      name: "TradeTech Solutions",
      avatarUrl: "/placeholder.svg",
      initials: "TS",
      role: "Seller", // Added role
    },
    lastMessage: "Yes, the robot is compatible with MT4 and MT5.",
    unread: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    messages: [
      {
        id: "1-1",
        content: "Hello, I'm interested in your TrendWave Pro robot. Is it compatible with MT4?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "1-2",
        content: "Yes, the robot is compatible with MT4 and MT5.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
    ],
    robotId: "robot-001"
  },
  {
    id: "2",
    user: {
      name: "Velocity Trading Systems",
      avatarUrl: "/placeholder.svg",
      initials: "VS",
      role: "Seller", // Added role
    },
    lastMessage: "The ScalpMaster Elite includes detailed documentation and video tutorials.",
    unread: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: [
      {
        id: "2-1",
        content: "Hi there, does your ScalpMaster Elite come with documentation?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
      {
        id: "2-2",
        content: "The ScalpMaster Elite includes detailed documentation and video tutorials.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
    robotId: "robot-002"
  },
  {
    id: "3",
    user: {
      name: "Algo Trading Experts",
      avatarUrl: "/placeholder.svg",
      initials: "AE",
      role: "Seller", // Added role
    },
    lastMessage: "Our support team is available 24/7 to help with any issues.",
    unread: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messages: [
      {
        id: "3-1",
        content: "What kind of support do you offer after purchase?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
      },
      {
        id: "3-2",
        content: "Our support team is available 24/7 to help with any issues.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ],
    robotId: "robot-003"
  },
];
