// Messaging-related type definitions

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "text" | "file" | "image";
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    photo?: string;
    role: "customer" | "provider";
  }[];
  lastMessage: Message;
  unreadCount: number;
  relatedTaskId?: string;
  relatedTaskTitle?: string;
  createdAt: string;
  updatedAt: string;
}
