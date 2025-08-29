import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useVerificationRestrictions } from "../../hooks/useVerificationRestrictions";
import CustomCard from "../forms/Card";

interface ChatWidgetProps {
  provider?: {
    id: string;
    name: string;
    photo?: string;
  };
  preFilledMessage?: string;
  serviceName?: string;
  onOpen?: () => void;
  forceOpen?: boolean;
}

export default function ChatWidget({
  provider,
  preFilledMessage,
  serviceName,
  onOpen,
  forceOpen = false,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: provider?.name || "Sarah Chen",
      content: "Hi! I'd love to discuss your project requirements.",
      time: "2:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Thanks for reaching out! Could you share your portfolio?",
      time: "2:35 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: provider?.name || "Sarah Chen",
      content: "Sure! I'll send you my latest work samples.",
      time: "2:38 PM",
      isOwn: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { isAuthenticated } = useAuth();
  const { canSendMessages, restrictionMessage } = useVerificationRestrictions();

  // Set pre-filled message when provided
  useEffect(() => {
    if (preFilledMessage) {
      let message = preFilledMessage;
      if (serviceName) {
        message = `I'm interested in your ${serviceName}. ${preFilledMessage}`;
      }
      setNewMessage(message);
    }
  }, [preFilledMessage, serviceName]);

  // Handle forced open
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  }, [forceOpen, onOpen]);

  if (!isAuthenticated) return null;

  const handleSend = () => {
    if (!newMessage.trim()) return;

    if (!canSendMessages) {
      alert(restrictionMessage);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      },
    ]);
    setNewMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Open chat"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            2
          </span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <CustomCard
          shadow="lg"
          padding="none"
          className="fixed bottom-24 right-6 w-80 h-96 z-40 flex flex-col border"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-3">
              {provider?.photo ? (
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <MessageCircle className="h-5 w-5 text-blue-600" />
              )}
              <h3 className="font-semibold text-gray-900">
                Chat with {provider?.name || "Sarah Chen"}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isOwn
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${msg.isOwn ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim() || !canSendMessages}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CustomCard>
      )}
    </>
  );
}
