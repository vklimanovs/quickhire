/** @refresh reset */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import { useToast } from "../hooks/use-toast";
import { Message, Conversation } from "../Types";

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  canStartConversation: (
    otherUserId: string,
  ) => Promise<{ allowed: boolean; reason?: string }>;
  startConversation: (
    otherUserId: string,
    initialMessage?: string,
    context?: { type: string; relatedId?: string; relatedTitle?: string },
  ) => Promise<Conversation>;
  sendMessage: (
    conversationId: string,
    body: string,
    metadata?: any,
  ) => Promise<Message>;
  markAsRead: (conversationId: string) => Promise<void>;
  setActiveConversation: (conversation: Conversation | null) => void;
  refreshConversations: () => Promise<void>;
  getTotalUnreadCount: () => number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial conversations
  useEffect(() => {
    if (user?.id) {
      refreshConversations();
    }
  }, [user?.id]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // TODO: Replace with actual API call
      setMessages([]);

      // Mark as read when viewing
      if (
        user?.id &&
        activeConversation.unreadCount &&
        activeConversation.unreadCount[user.id] > 0
      ) {
        markAsRead(activeConversation.id);
      }
    } else {
      setMessages([]);
    }
  }, [activeConversation, user?.id]);

  const refreshConversations = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      setConversations([]);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const canStartConversation = useCallback(
    async (
      otherUserId: string,
    ): Promise<{ allowed: boolean; reason?: string }> => {
      if (!user) {
        return { allowed: false, reason: "Not authenticated" };
      }

      if (user.id === otherUserId) {
        return { allowed: false, reason: "Cannot message yourself" };
      }

      // TODO: Replace with actual API call to get user info
      // For now, assume user exists
      const otherUser = { id: otherUserId, roles: {}, accountType: "customer" };
      if (!otherUser) {
        return { allowed: false, reason: "User not found" };
      }

      // Check role rules: only customer ↔ provider communication allowed
      const isUserCustomer =
        user.roles?.isClient || user.accountType === "customer";
      const isUserProvider =
        user.roles?.isFreelance || user.accountType === "provider";
      // Handle both old and new User type structures for otherUser
      const isOtherCustomer = Array.isArray(otherUser.roles)
        ? otherUser.roles.includes("customer")
        : (otherUser.roles as any)?.isClient ||
          (otherUser as any).accountType === "customer";
      const isOtherProvider = Array.isArray(otherUser.roles)
        ? otherUser.roles.includes("provider")
        : (otherUser.roles as any)?.isFreelance ||
          (otherUser as any).accountType === "provider";

      // Check if it's customer ↔ customer (blocked)
      if (
        isUserCustomer &&
        !isUserProvider &&
        isOtherCustomer &&
        !isOtherProvider
      ) {
        return {
          allowed: false,
          reason:
            currentLanguage === "ru"
              ? "Вы можете отправлять сообщения только поставщикам услуг"
              : currentLanguage === "en"
                ? "You can only message providers"
                : "Saate sõnumeid saata ainult teenusepakkujatele",
        };
      }

      // Check provider availability if messaging a provider
      if (isOtherProvider) {
        // TODO: Check if provider is inactive/away
        // For now, allow all conversations to providers
      }

      return { allowed: true };
    },
    [user, currentLanguage],
  );

  const startConversation = useCallback(
    async (
      otherUserId: string,
      initialMessage?: string,
      context?: { type: string; relatedId?: string; relatedTitle?: string },
    ): Promise<Conversation> => {
      if (!user?.id) {
        throw new Error("Not authenticated");
      }

      // Check if conversation is allowed
      const { allowed, reason } = await canStartConversation(otherUserId);
      if (!allowed) {
        const errorMessage = reason || "Cannot start conversation";
        toast({
          title:
            currentLanguage === "ru"
              ? "Ошибка"
              : currentLanguage === "en"
                ? "Error"
                : "Viga",
          description: errorMessage,
          variant: "destructive",
        });
        throw new Error(errorMessage);
      }

      // TODO: Replace with actual API call to find or create conversation
      const conversation: Conversation = {
        id: `conv-${Date.now()}`,
        participants: [
          {
            id: user.id,
            name: user.name || user.firstName || "",
            photo: user.profileImage,
            role: user.accountType as "customer" | "provider",
          },
          {
            id: otherUserId,
            name: "Other User",
            photo: undefined,
            role: "customer",
          },
        ],
        lastMessage: {
          id: `msg-${Date.now()}`,
          conversationId: `conv-${Date.now()}`,
          senderId: user.id,
          senderName: user.name || user.firstName || "",
          senderPhoto: user.profileImage,
          content: "",
          timestamp: new Date().toISOString(),
          read: true,
          type: "text",
        },
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Send initial message if provided
      if (initialMessage) {
        await sendMessage(conversation.id, initialMessage);
      }

      // Refresh conversations
      await refreshConversations();

      return conversation;
    },
    [user, canStartConversation, currentLanguage, toast, refreshConversations],
  );

  const sendMessage = useCallback(
    async (
      conversationId: string,
      body: string,
      metadata?: any,
    ): Promise<Message> => {
      if (!user?.id) {
        throw new Error("Not authenticated");
      }

      if (!body.trim()) {
        throw new Error("Message cannot be empty");
      }

      const conversation = conversations.find((c) => c.id === conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }

      // Check if user is participant
      if (!conversation.participants.some((p) => p.id === user.id)) {
        throw new Error("Not authorized to send messages in this conversation");
      }

      // TODO: Replace with actual API call to create message
      const message: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: user.id,
        senderName: user.name || user.firstName || "",
        senderPhoto: user.profileImage,
        content: body.trim(),
        timestamp: new Date().toISOString(),
        read: false,
        type: "text",
      };

      // Update local state
      if (activeConversation?.id === conversationId) {
        setMessages((prev) => [...prev, message]);
      }

      // Refresh conversations to update unread counts
      await refreshConversations();

      return message;
    },
    [user, conversations, activeConversation, refreshConversations],
  );

  const markAsRead = useCallback(
    async (conversationId: string) => {
      if (!user?.id) return;

      // TODO: Replace with actual API call to mark messages as read

      // Update local state
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
        ),
      );
    },
    [user?.id],
  );

  const getTotalUnreadCount = useCallback(() => {
    if (!user?.id) return 0;

    return conversations.reduce((total, conv) => {
      return total + (conv.unreadCount[user.id] || 0);
    }, 0);
  }, [conversations, user?.id]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        isLoading,
        canStartConversation,
        startConversation,
        sendMessage,
        markAsRead,
        setActiveConversation,
        refreshConversations,
        getTotalUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
