
export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

export interface ChatUser {
  name: string;
  avatarUrl: string;
  initials: string;
}

export interface Chat {
  id: string;
  user: ChatUser;
  lastMessage: string;
  unread: boolean;
  timestamp: Date;
  messages: Message[];
}
