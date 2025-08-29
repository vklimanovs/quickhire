import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Modal from "./Modal";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    consultationTitle: string;
    providerName: string;
    date: string;
    time: string;
  };
  onReschedule: (bookingId: string, newDate: string, newTime: string) => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  booking,
  onReschedule,
}: RescheduleModalProps) {
  const { currentLanguage } = useLanguage();

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onReschedule(booking.id, newDate, newTime);
    setIsSubmitting(false);
    onClose();

    // Reset form
    setNewDate("");
    setNewTime("");
  };

  if (!isOpen) return null;

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        ru: "Перенести сессию",
        en: "Reschedule Session",
        et: "Muuda sessiooniaega",
      }}
      size="md"
    >
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">
          <LanguageText
            ru="Текущее время"
            en="Current Time"
            et="Praegune aeg"
          />
        </h3>
        <p className="text-sm text-gray-600">{booking.consultationTitle}</p>
        <p className="text-sm text-gray-600">
          <LanguageText ru="с" en="with" et="koos" /> {booking.providerName}
        </p>
        <p className="text-sm font-medium text-gray-900 mt-1">
          {new Date(booking.date).toLocaleDateString()}{" "}
          <LanguageText ru="в" en="at" et="kell" /> {booking.time}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* New Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LanguageText ru="Новая дата" en="New Date" et="Uus kuupäev" />
          </label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* New Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LanguageText ru="Новое время" en="New Time" et="Uus kellaaeg" />
          </label>
          <select
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">
              <LanguageText
                ru="Выберите время"
                en="Select time"
                et="Vali kellaaeg"
              />
            </option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <LanguageText
              ru="Перенос сессии требует подтверждения от провайдера. Статус изменится на 'Ожидает подтверждения'."
              en="Rescheduling requires provider confirmation. Status will change to 'Pending approval'."
              et="Aja muutmine vajab teenusepakkuja kinnitust. Staatus muutub 'Ootab kinnitust'."
            />
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {currentLanguage === "ru"
              ? "Отмена"
              : currentLanguage === "en"
                ? "Cancel"
                : "Tühista"}
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !newDate || !newTime}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {currentLanguage === "ru"
                  ? "Перенос..."
                  : currentLanguage === "en"
                    ? "Rescheduling..."
                    : "Muudan..."}
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                {currentLanguage === "ru"
                  ? "Перенести"
                  : currentLanguage === "en"
                    ? "Reschedule"
                    : "Muuda aega"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
