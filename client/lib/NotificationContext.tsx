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
// TODO: Replace with actual API imports

import { useToast } from "../hooks/use-toast";
import { NotificationEvent, NotificationPreferences } from "@/Types";

interface NotificationContextType {
  notifications: NotificationEvent[];
  unreadCount: number;
  preferences: NotificationPreferences;
  updatePreferences: (preferences: NotificationPreferences) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

// Email throttling state
const emailThrottleState = new Map<string, number>();

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      tasks: true,
      messages: true,
      reviews: true,
      marketing: false,
    },
    push: {
      tasks: true,
      messages: true,
      reviews: true,
    },
    inApp: {
      tasks: true,
      messages: true,
      reviews: true,
      marketing: false,
    },
  });

  // Load initial data
  useEffect(() => {
    if (!user?.id) return;

    // TODO: Replace with actual API calls
    setNotifications([]);
    // Keep default preferences
  }, [user?.id]);

  // Handle new notification events
  const handleNotificationEvent = useCallback(
    (event: any) => {
      if (!user?.id) return;

      let notificationData: Omit<NotificationEvent, "id" | "createdAt">;

      switch (event.type) {
        case "message":
          // Only notify if user is not the sender
          if (event.senderId === user.id) return;

          notificationData = {
            type: "message",
            title:
              currentLanguage === "ru"
                ? "Новое сообщение"
                : currentLanguage === "en"
                  ? "New Message"
                  : "Uus sõnum",
            description:
              currentLanguage === "ru"
                ? "У вас есть новое сообщение"
                : currentLanguage === "en"
                  ? "You have a new message"
                  : "Teil on uus sõnum",
            timestamp: new Date().toISOString(),
            read: false,
            metadata: { messageId: event.conversationId },
          };
          break;

        case "booking":
          notificationData = {
            type: "booking",
            title: getBookingStatusTitle(event.status),
            description: getBookingStatusMessage(event.status),
            timestamp: new Date().toISOString(),
            read: false,
            metadata: { bookingId: event.bookingId },
          };
          break;

        default:
          return;
      }

      // Create in-app notification
      if (
        (preferences.inApp.messages && event.type === "message") ||
        (preferences.inApp.tasks && event.type === "task")
      ) {
        // TODO: Replace with actual API call
        const newNotification: NotificationEvent = {
          ...notificationData,
          id: `notif-${Date.now()}`,
        };
        setNotifications((prev) => [newNotification, ...prev]);

        // Show toast for in-app notification
        toast({
          title: notificationData.title,
          description: notificationData.description,
          variant: "default",
        });
      }

      // Handle email notifications (with throttling)
      const shouldSendEmail =
        (event.type === "message" && preferences.email.messages) ||
        (event.type === "task" && preferences.email.tasks);

      if (shouldSendEmail) {
        sendEmailNotification(notificationData, event);
      }
    },
    [user?.id, preferences, currentLanguage, toast],
  );

  // Email throttling helper
  const sendEmailNotification = (
    notificationData: Omit<NotificationEvent, "id">,
    event: any,
  ) => {
    const throttleKey =
      event.type === "message"
        ? `message_${event.conversationId}`
        : event.type === "booking"
          ? `booking_${event.bookingId}`
          : `task_proposal_${event.taskId}`;

    const now = Date.now();
    const lastSent = emailThrottleState.get(throttleKey) || 0;
    const throttleTime = 60000; // 1 minute

    if (now - lastSent >= throttleTime) {
      // Mock email sending (in real app, this would be an API call)
      console.log("📧 Email notification sent:", {
        to: user?.email,
        subject: notificationData.title,
        body: notificationData.description,
        throttleKey,
      });

      emailThrottleState.set(throttleKey, now);
    }
  };

  // Localized notification messages
  const getBookingStatusTitle = (status: string) => {
    switch (status) {
      case "approved":
        return currentLanguage === "ru"
          ? "Брони��ование подтверждено"
          : currentLanguage === "en"
            ? "Booking Approved"
            : "Broneering kinnitatud";
      case "declined":
        return currentLanguage === "ru"
          ? "Бронирование отклонено"
          : currentLanguage === "en"
            ? "Booking Declined"
            : "Broneering tagasi lükatud";
      case "rescheduled":
        return currentLanguage === "ru"
          ? "Бронирование перенесено"
          : currentLanguage === "en"
            ? "Booking Rescheduled"
            : "Broneering ümber planeeritud";
      case "cancelled":
        return currentLanguage === "ru"
          ? "Бронирование отменено"
          : currentLanguage === "en"
            ? "Booking Cancelled"
            : "Broneering tühistatud";
      default:
        return currentLanguage === "ru"
          ? "Статус бронирования изменен"
          : currentLanguage === "en"
            ? "Booking Status Changed"
            : "Broneeringu staatus muutus";
    }
  };

  const getBookingStatusMessage = (status: string) => {
    switch (status) {
      case "approved":
        return currentLanguage === "ru"
          ? "Ваше бронирование было одобрено"
          : currentLanguage === "en"
            ? "Your booking has been approved"
            : "Teie broneering on kinnitatud";
      case "declined":
        return currentLanguage === "ru"
          ? "Ваше бронирование было отклонено"
          : currentLanguage === "en"
            ? "Your booking has been declined"
            : "Teie broneering on tagasi lükatud";
      case "rescheduled":
        return currentLanguage === "ru"
          ? "Ваше бронирование было перенесено"
          : currentLanguage === "en"
            ? "Your booking has been rescheduled"
            : "Teie broneering on ümber planeeritud";
      case "cancelled":
        return currentLanguage === "ru"
          ? "Ваше бронирование было отменено"
          : currentLanguage === "en"
            ? "Your booking has been cancelled"
            : "Teie broneering on tühistatud";
      default:
        return currentLanguage === "ru"
          ? "Статус вашего бронирования изменился"
          : currentLanguage === "en"
            ? "Your booking status has changed"
            : "Teie broneeringu staatus on muutunud";
    }
  };

  // TODO: Subscribe to notification events from real API
  useEffect(() => {
    // Placeholder for event subscription
  }, [handleNotificationEvent]);

  const updatePreferences = useCallback(
    (newPreferences: NotificationPreferences) => {
      if (!user?.id) return;

      setPreferences(newPreferences);
      // TODO: Replace with actual API call

      toast({
        title:
          currentLanguage === "ru"
            ? "Настройки сохранены"
            : currentLanguage === "en"
              ? "Settings saved"
              : "Seaded salvestatud",
        variant: "default",
      });
    },
    [user?.id, currentLanguage, toast],
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    // TODO: Replace with actual API call
  }, []);

  const markAllAsRead = useCallback(() => {
    const unreadNotifications = notifications.filter((n) => !n.read);

    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );

    // TODO: Replace with actual API calls
    // unreadNotifications.forEach((notification) => {
    //   // API call to mark as read
    // });
  }, [notifications]);

  const refreshNotifications = useCallback(() => {
    if (!user?.id) return;

    // TODO: Replace with actual API call
    setNotifications([]);
  }, [user?.id]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        preferences,
        updatePreferences,
        markAsRead,
        markAllAsRead,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
