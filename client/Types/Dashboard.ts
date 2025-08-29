// Dashboard-related type definitions

export interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  link?: string;
}

export interface NotificationPreferences {
  email: {
    tasks: boolean;
    messages: boolean;
    reviews: boolean;
    marketing: boolean;
  };
  push: {
    tasks: boolean;
    messages: boolean;
    reviews: boolean;
  };
  inApp: {
    tasks: boolean;
    messages: boolean;
    reviews: boolean;
    marketing: boolean;
  };
}

export interface NotificationEvent {
  id: string;
  type: "task" | "message" | "review" | "booking" | "payment";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    taskId?: string;
    messageId?: string;
    reviewId?: string;
    bookingId?: string;
  };
}
