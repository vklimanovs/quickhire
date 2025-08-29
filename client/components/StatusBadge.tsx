import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useToast } from "../hooks/use-toast";
import { ChevronDown, CheckCircle, Calendar, Clock } from "lucide-react";
import Card from "./Card";
interface ProviderAvailability {
  state: "available" | "busy" | "inactive";
  awayFrom?: string;
  awayUntil?: string;
  awayMessage?: string;
}

export type ProviderStatus = "available" | "busy" | "offline" | "inactive";

interface StatusBadgeProps {
  currentStatus: ProviderStatus;
  availability?: ProviderAvailability;
  onStatusChange: (status: ProviderStatus) => void;
  onAvailabilityChange?: (availability: ProviderAvailability) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export default function StatusBadge({
  currentStatus,
  availability,
  onStatusChange,
  onAvailabilityChange,
  disabled = false,
  size = "sm",
}: StatusBadgeProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [awayFromDate, setAwayFromDate] = useState("");
  const [awayFromTime, setAwayFromTime] = useState("");
  const [awayUntilDate, setAwayUntilDate] = useState("");
  const [awayUntilTime, setAwayUntilTime] = useState("");
  const [awayMessage, setAwayMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    };

    if (isOpen || showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, showCalendar]);

  // Check for expired break status
  useEffect(() => {
    if (currentStatus === "inactive" && availability?.awayUntil) {
      const untilDate = new Date(availability.awayUntil);
      const now = new Date();

      if (now >= untilDate) {
        // Break has ended, automatically set status back to available
        onStatusChange("available");

        toast({
          title:
            currentLanguage === "ru"
              ? "Перерыв завершен"
              : currentLanguage === "en"
                ? "Break ended"
                : "Puhkus lõppenud",
          description:
            currentLanguage === "ru"
              ? 'Статус автоматически изменен на "Доступен"'
              : currentLanguage === "en"
                ? 'Status automatically set to "Available"'
                : 'Olek automaatselt muudetud "Saadaval"',
          variant: "default",
        });
      }
    }
  }, [currentStatus, availability, onStatusChange, currentLanguage, toast]);

  // Initialize calendar fields when opening
  useEffect(() => {
    if (showCalendar) {
      if (availability?.awayFrom) {
        const fromDate = new Date(availability.awayFrom);
        setAwayFromDate(fromDate.toISOString().split("T")[0]);
        setAwayFromTime(fromDate.toTimeString().slice(0, 5));
      } else {
        const now = new Date();
        setAwayFromDate(now.toISOString().split("T")[0]);
        setAwayFromTime(now.toTimeString().slice(0, 5));
      }

      if (availability?.awayUntil) {
        const untilDate = new Date(availability.awayUntil);
        setAwayUntilDate(untilDate.toISOString().split("T")[0]);
        setAwayUntilTime(untilDate.toTimeString().slice(0, 5));
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setAwayUntilDate(tomorrow.toISOString().split("T")[0]);
        setAwayUntilTime("09:00");
      }

      setAwayMessage(availability?.awayMessage || "");
    }
  }, [showCalendar, availability]);

  const handleStatusChange = (newStatus: ProviderStatus) => {
    if (newStatus === "inactive") {
      // Only show calendar for 'inactive' status (temporary break)
      setShowCalendar(true);
      setIsOpen(false);
    } else {
      // For 'available', 'busy', and 'offline' - change status immediately
      onStatusChange(newStatus);
      setIsOpen(false);

      toast({
        title:
          currentLanguage === "ru"
            ? `Статус: "${getStatusText(newStatus)}"`
            : currentLanguage === "en"
              ? `Status: "${getStatusText(newStatus)}"`
              : `Olek: "${getStatusText(newStatus)}"`,
        variant: "default",
      });
    }
  };

  const handleCalendarSave = () => {
    if (!awayFromDate || !awayFromTime || !awayUntilDate || !awayUntilTime) {
      return;
    }

    const awayFrom = new Date(`${awayFromDate}T${awayFromTime}`).toISOString();
    const awayUntil = new Date(
      `${awayUntilDate}T${awayUntilTime}`,
    ).toISOString();

    if (onAvailabilityChange) {
      onAvailabilityChange({
        state: "inactive",
        awayFrom,
        awayUntil,
        awayMessage: awayMessage.trim() || undefined,
      });
    }

    setShowCalendar(false);
  };

  const getStatusText = (status: ProviderStatus) => {
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
      case "offline":
        return currentLanguage === "ru"
          ? "Не в сети"
          : currentLanguage === "en"
            ? "Offline"
            : "Võrguühenduseta";
      case "inactive":
        return currentLanguage === "ru"
          ? "На перерыве"
          : currentLanguage === "en"
            ? "On break"
            : "Puhkusel";
      default:
        return status;
    }
  };

  const getStatusColor = (status: ProviderStatus) => {
    switch (status) {
      case "available":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
          border: "border-green-200",
        };
      case "busy":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          dot: "bg-orange-500",
          border: "border-orange-200",
        };
      case "offline":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
          border: "border-gray-200",
        };
      case "inactive":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-500",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
          border: "border-gray-200",
        };
    }
  };

  const currentColors = getStatusColor(currentStatus);
  const isSmall = size === "sm";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`inline-flex items-center ${isSmall ? "px-2 py-1" : "px-3 py-2"} rounded-full border transition-colors ${
          currentColors.bg
        } ${currentColors.text} ${currentColors.border} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div
          className={`${isSmall ? "w-2 h-2" : "w-3 h-3"} rounded-full mr-2 ${currentColors.dot} ${
            currentStatus === "available" ? "animate-pulse" : ""
          }`}
        />
        <span className={`${isSmall ? "text-xs" : "text-sm"} font-medium`}>
          {getStatusText(currentStatus)}
        </span>
        <ChevronDown
          className={`ml-1 ${isSmall ? "h-3 w-3" : "h-4 w-4"} transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <Card
          border
          shadow="lg"
          className="absolute right-0 mt-2 w-64 sm:w-72 z-50 overflow-hidden"
        >
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm">
              {currentLanguage === "ru"
                ? "Статус доступности"
                : currentLanguage === "en"
                  ? "Availability Status"
                  : "Saadavuse olek"}
            </h3>
          </div>

          <div className="p-2">
            {(
              ["available", "busy", "offline", "inactive"] as ProviderStatus[]
            ).map((status) => {
              const colors = getStatusColor(status);
              const isSelected = currentStatus === status;

              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    isSelected
                      ? `${colors.bg} ${colors.text}`
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${colors.dot} ${
                        isSelected && status === "available"
                          ? "animate-pulse"
                          : ""
                      }`}
                    />
                    <span
                      className={`font-medium text-sm ${isSelected ? colors.text : "text-gray-900"}`}
                    >
                      {getStatusText(status)}
                    </span>
                    {isSelected && (
                      <CheckCircle
                        className={`ml-auto h-4 w-4 ${colors.text}`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Calendar Modal for Inactive Status */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card shadow="lg" padding="none" className="max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentLanguage === "ru"
                  ? "Установить период перерыва"
                  : currentLanguage === "en"
                    ? "Set Break Period"
                    : "Määra puhkuse periood"}
              </h3>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {currentLanguage === "ru"
                      ? "С даты"
                      : currentLanguage === "en"
                        ? "From Date"
                        : "Alates kuupäevast"}
                  </label>
                  <input
                    type="date"
                    value={awayFromDate}
                    onChange={(e) => setAwayFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {currentLanguage === "ru"
                      ? "Время"
                      : currentLanguage === "en"
                        ? "Time"
                        : "Kellaaeg"}
                  </label>
                  <input
                    type="time"
                    value={awayFromTime}
                    onChange={(e) => setAwayFromTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {currentLanguage === "ru"
                      ? "До даты"
                      : currentLanguage === "en"
                        ? "Until Date"
                        : "Kuni kuupäevani"}
                  </label>
                  <input
                    type="date"
                    value={awayUntilDate}
                    onChange={(e) => setAwayUntilDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {currentLanguage === "ru"
                      ? "Время"
                      : currentLanguage === "en"
                        ? "Time"
                        : "Kellaaeg"}
                  </label>
                  <input
                    type="time"
                    value={awayUntilTime}
                    onChange={(e) => setAwayUntilTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === "ru"
                    ? "Сообщение (необязательно)"
                    : currentLanguage === "en"
                      ? "Message (optional)"
                      : "Sõnum (valikuline)"}
                </label>
                <textarea
                  value={awayMessage}
                  onChange={(e) => setAwayMessage(e.target.value)}
                  placeholder={
                    currentLanguage === "ru"
                      ? "Я отсутствую до {date}. Отвечу, когда вернусь."
                      : currentLanguage === "en"
                        ? "I'm away until {date}. I'll reply when I'm back."
                        : "Olen eemal kuni {date}. Vastan, kui tagasi jõuan."
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowCalendar(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                {currentLanguage === "ru"
                  ? "Отмена"
                  : currentLanguage === "en"
                    ? "Cancel"
                    : "Tühista"}
              </button>
              <button
                onClick={handleCalendarSave}
                disabled={
                  !awayFromDate ||
                  !awayFromTime ||
                  !awayUntilDate ||
                  !awayUntilTime
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors text-sm"
              >
                {currentLanguage === "ru"
                  ? "Сохранить"
                  : currentLanguage === "en"
                    ? "Save"
                    : "Salvesta"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
