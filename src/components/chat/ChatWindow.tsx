
import { Chat, Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { formatMessageTime } from "@/utils/dateUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface ChatWindowProps {
  chat: Chat | null;
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isLoading?: boolean;
  isSending?: boolean;
}

export function ChatWindow({ 
  chat, 
  newMessage, 
  onNewMessageChange, 
  onSendMessage, 
  isLoading,
  isSending = false
}: ChatWindowProps) {
  // Create a ref for the messages container to auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  if (!chat) {
    return (
      <Card className="h-[calc(100vh-16rem)] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No chat selected</h3>
            <p className="text-muted-foreground mb-4">
              Select a conversation from the list to view messages
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-[calc(100vh-16rem)] flex flex-col">
        <CardHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16 mt-1" />
              </div>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-start">
                <Skeleton className="h-16 w-2/3 rounded-lg" />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-16rem)] flex flex-col">
      <CardHeader className="px-6 py-4 border-b flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={chat.user.avatarUrl} />
              <AvatarFallback>{chat.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{chat.user.name}</CardTitle>
              <CardDescription>Seller</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/robot/${chat.robotId}`}>View Robot</Link>
          </Button>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.messages.map((message) => (
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
                } ${message.id.startsWith('temp-') ? "opacity-70" : ""}`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <p
                    className={`text-xs ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatMessageTime(message.timestamp)}
                  </p>
                  {message.id.startsWith('temp-') && (
                    <div className="ml-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isSending}
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim() || isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
