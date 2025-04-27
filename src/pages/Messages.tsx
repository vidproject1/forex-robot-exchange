
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface Chat {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    initials: string;
  };
  lastMessage: string;
  unread: boolean;
  timestamp: Date;
  messages: Message[];
}

// Mock data for chats
const mockChats: Chat[] = [
  {
    id: "1",
    user: {
      name: "TradeTech Solutions",
      avatarUrl: "/placeholder.svg",
      initials: "TS",
    },
    lastMessage: "Yes, the robot is compatible with MT4 and MT5.",
    unread: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    messages: [
      {
        id: "1-1",
        content: "Hello, I'm interested in your TrendWave Pro robot. Is it compatible with MT4?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "1-2",
        content: "Yes, the robot is compatible with MT4 and MT5.",
        sender: "other",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
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

function formatMessageTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  
  return date.toLocaleDateString();
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState(mockChats);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const updatedMessage: Message = {
      id: `${selectedChat.id}-${selectedChat.messages.length + 1}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    // Add the new message to the selected chat
    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, updatedMessage],
          lastMessage: newMessage,
          timestamp: new Date(),
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, updatedMessage],
      lastMessage: newMessage,
      timestamp: new Date(),
    });
    setNewMessage("");
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: `${selectedChat.id}-${selectedChat.messages.length + 2}`,
        content: "Thank you for your message. I'll get back to you soon.",
        sender: "other",
        timestamp: new Date(),
      };
      
      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, updatedMessage, responseMessage],
            lastMessage: responseMessage.content,
            timestamp: new Date(),
          };
        }
        return chat;
      });
      
      setChats(updatedChatsWithResponse);
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, updatedMessage, responseMessage],
        lastMessage: responseMessage.content,
        timestamp: new Date(),
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1">
            <Card className="h-[calc(100vh-16rem)]">
              <CardHeader className="px-4 py-3">
                <CardTitle className="text-xl">Conversations</CardTitle>
                <CardDescription>Contact sellers about their robots</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-5rem)]">
                <CardContent className="px-4 py-0">
                  {chats.map((chat) => (
                    <div key={chat.id}>
                      <button
                        className={`w-full flex items-start space-x-3 py-3 px-2 hover:bg-muted/50 rounded-md transition-colors ${
                          selectedChat?.id === chat.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={chat.user.avatarUrl} />
                          <AvatarFallback>{chat.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 text-left">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium leading-none">
                              {chat.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatMessageTime(chat.timestamp)}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread && (
                          <div className="h-2.5 w-2.5 bg-primary rounded-full" />
                        )}
                      </button>
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
          
          {/* Chat Window */}
          <div className="md:col-span-2">
            <Card className="h-[calc(100vh-16rem)] flex flex-col">
              {selectedChat ? (
                <>
                  <CardHeader className="px-6 py-4 border-b flex-shrink-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={selectedChat.user.avatarUrl} />
                          <AvatarFallback>{selectedChat.user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{selectedChat.user.name}</CardTitle>
                          <CardDescription>Seller</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/robot/1`}>View Robot</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === "user"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t mt-auto">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex space-x-2"
                    >
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">No chat selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select a conversation from the list to view messages
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
