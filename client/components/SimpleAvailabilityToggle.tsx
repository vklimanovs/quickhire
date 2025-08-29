import React from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useToast } from "../hooks/use-toast";

export type SimpleStatus = "available" | "busy";

interface SimpleAvailabilityToggleProps {
  currentStatus: SimpleStatus;
  onStatusChange: (status: SimpleStatus) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export default function SimpleAvailabilityToggle({
  currentStatus,
  onStatusChange,
  disabled = false,
  size = "sm",
}: SimpleAvailabilityToggleProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  const handleToggle = () => {
    const newStatus: SimpleStatus =
      currentStatus === "available" ? "busy" : "available";
    onStatusChange(newStatus);

    toast({
      title:
        currentLanguage === "ru"
          ? `Статус: "${getStatusText(newStatus)}"`
          : currentLanguage === "en"
            ? `Status: "${getStatusText(newStatus)}"`
            : `Olek: "${getStatusText(newStatus)}"`,
      variant: "default",
    });
  };

  const getStatusText = (status: SimpleStatus) => {
    switch (status) {
      case "available":
        return currentLanguage === "ru"
          ? "Доступен"
          : currentLanguage === "en"
            ? "Available"
            : "Saadaval";
      case "busy":
        return currentLanguage === "ru"
          ? "Занят"
          : currentLanguage === "en"
            ? "Busy"
            : "Hõivatud";
      default:
        return status;
    }
  };

  const getStatusColor = (status: SimpleStatus) => {
    switch (status) {
      case "available":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
          border: "border-green-200",
          hoverBg: "hover:bg-green-200",
        };
      case "busy":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          dot: "bg-orange-500",
          border: "border-orange-200",
          hoverBg: "hover:bg-orange-200",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
          border: "border-gray-200",
          hoverBg: "hover:bg-gray-200",
        };
    }
  };

  const currentColors = getStatusColor(currentStatus);
  const isSmall = size === "sm";

  const statusEmoji = currentStatus === "available" ? "🟢" : "🔴";
  const toggleBg =
    currentStatus === "available" ? "bg-green-500" : "bg-red-500";

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`inline-flex items-center ${isSmall ? "px-3 py-1.5" : "px-4 py-2"} rounded-full border transition-all duration-200 ${
        currentColors.bg
      } ${currentColors.text} ${currentColors.border} ${currentColors.hoverBg} hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden`}
      title={
        currentLanguage === "ru"
          ? `Нажмите для переключения на "${getStatusText(currentStatus === "available" ? "busy" : "available")}"`
          : currentLanguage === "en"
            ? `Click to switch to "${getStatusText(currentStatus === "available" ? "busy" : "available")}"`
            : `Klõpsake lülitamiseks "${getStatusText(currentStatus === "available" ? "busy" : "available")}"`
      }
    >
      {/* Toggle Switch Visual */}
      <div className="flex items-center mr-2">
        <div
          className={`relative inline-flex h-5 w-9 rounded-full border-2 border-transparent transition-colors duration-200 ${
            currentStatus === "available" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              currentStatus === "available" ? "translate-x-5" : "translate-x-0"
            } mt-0.5`}
          />
        </div>
      </div>

      {/* Status Emoji and Text */}
      <span className="mr-1 text-sm">{statusEmoji}</span>
      <span className={`${isSmall ? "text-xs" : "text-sm"} font-medium`}>
        {getStatusText(currentStatus)}
      </span>
    </button>
  );
}
