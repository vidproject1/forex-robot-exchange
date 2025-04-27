
import { Chat } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatMessageTime } from "@/utils/dateUtils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  isLoading: boolean;
}

export function ChatList({ chats, selectedChat, onSelectChat, isLoading }: ChatListProps) {
  if (isLoading) {
    return (
      <Card className="h-[calc(100vh-16rem)]">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-xl">Conversations</CardTitle>
          <CardDescription>Contact sellers about their robots</CardDescription>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-5rem)]">
          <CardContent className="px-4 py-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    );
  }

  return (
    <Card className="h-[calc(100vh-16rem)]">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl">Conversations</CardTitle>
        <CardDescription>Contact sellers about their robots</CardDescription>
      </CardHeader>
      <ScrollArea className="h-[calc(100%-5rem)]">
        <CardContent className="px-4 py-0">
          {chats.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            chats.map((chat) => (
              <div key={chat.id}>
                <button
                  className={`w-full flex items-start space-x-3 py-3 px-2 hover:bg-muted/50 rounded-md transition-colors ${
                    selectedChat?.id === chat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => onSelectChat(chat)}
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
            ))
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
