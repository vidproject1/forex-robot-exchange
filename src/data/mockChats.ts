import { Chat } from "@/types/chat";

export const mockChats: Chat[] = [
  {
    id: "1",
    user: {
      name: "TradeTech Solutions",
      avatarUrl: "/placeholder.svg",
      initials: "TS",
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
  },
  {
    id: "2",
    user: {
      name: "Velocity Trading Systems",
      avatarUrl: "/placeholder.svg",
      initials: "VS",
    },
    lastMessage: "The ScalpMaster Elite includes detailed documentation and video tutorials.",
    unread: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    messages: [
      {
        id: "2-1",
        content: "Hi there, does your ScalpMaster Elite come with documentation?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: "2-2",
        content: "The ScalpMaster Elite includes detailed documentation and video tutorials.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ],
  },
  {
    id: "3",
    user: {
      name: "Algo Trading Experts",
      avatarUrl: "/placeholder.svg",
      initials: "AE",
    },
    lastMessage: "Our support team is available 24/7 to help with any issues.",
    unread: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    messages: [
      {
        id: "3-1",
        content: "What kind of support do you offer after purchase?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
      },
      {
        id: "3-2",
        content: "Our support team is available 24/7 to help with any issues.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
    ],
  },
];
