import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, CheckCheck, X } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useNotifications } from "../lib/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { et, enUS, ru } from "date-fns/locale";
import Card from "./Card";

export default function NotificationBell() {
  const { currentLanguage } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const getDateLocale = () => {
    switch (currentLanguage) {
      case "et":
        return et;
      case "ru":
        return ru;
      default:
        return enUS;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: getDateLocale(),
      });
    } catch {
      return dateString;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return "💬";
      case "booking":
        return "📅";
      default:
        return "🔔";
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Handle deep linking based on notification type
    if (notification.data?.conversationId) {
      // Navigate to conversation/chat
      console.log(
        "Navigate to conversation:",
        notification.data.conversationId,
      );
    } else if (notification.data?.bookingId) {
      // Navigate to booking details
      console.log("Navigate to booking:", notification.data.bookingId);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={
          currentLanguage === "ru"
            ? "Уведомления"
            : currentLanguage === "en"
              ? "Notifications"
              : "Teavitused"
        }
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <Card
          border
          shadow="lg"
          className="absolute right-0 mt-2 w-80 sm:w-96 z-50 max-h-96 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              {currentLanguage === "ru"
                ? "Уведомления"
                : currentLanguage === "en"
                  ? "Notifications"
                  : "Teavitused"}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {currentLanguage === "ru"
                    ? "Отметить все"
                    : currentLanguage === "en"
                      ? "Mark all read"
                      : "Märgi kõik loetuks"}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {currentLanguage === "ru"
                    ? "Уведомлений нет"
                    : currentLanguage === "en"
                      ? "No notifications"
                      : "Teavitusi pole"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 20).map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p
                            className={`text-sm font-medium ${
                              !notification.read
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 20 && (
            <div className="border-t border-gray-200 p-3 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {currentLanguage === "ru"
                  ? "Показать все уведомления"
                  : currentLanguage === "en"
                    ? "View all notifications"
                    : "Vaata kõiki teavitusi"}
              </button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
