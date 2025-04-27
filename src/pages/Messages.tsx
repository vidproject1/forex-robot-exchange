
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { ChatList } from "@/components/chat/ChatList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { mockChats } from "@/data/mockChats";
import type { Chat } from "@/types/chat";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState(mockChats);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const updatedMessage = {
      id: `${selectedChat.id}-${selectedChat.messages.length + 1}`,
      content: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
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
      const responseMessage = {
        id: `${selectedChat.id}-${selectedChat.messages.length + 2}`,
        content: "Thank you for your message. I'll get back to you soon.",
        sender: "other" as const,
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
          <div className="md:col-span-1">
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
            />
          </div>
          
          <div className="md:col-span-2">
            <ChatWindow
              chat={selectedChat}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
