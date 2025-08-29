import React, { useState } from "react";
import { X, Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import LanguageText from "../common/LanguageText";
import FormField from "../forms/FormField";
import CustomButton from "../forms/Button";
import Modal from "../modals/Modal";

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: {
    id: string;
    title: string;
    description: string;
    duration: string;
    price: string;
    includesVideoCall?: boolean;
  };
  provider: {
    id: string;
    name: string;
    photo: string;
  };
  onBookingConfirmed: (booking: any) => void;
}

export default function BookSessionModal({
  isOpen,
  onClose,
  consultation,
  provider,
  onBookingConfirmed,
}: BookSessionModalProps) {
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedDate ||
      !selectedTime ||
      !contactInfo.name ||
      !contactInfo.email
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const booking = {
      id: Date.now().toString(),
      consultationId: consultation.id,
      consultationTitle: consultation.title,
      providerId: provider.id,
      providerName: provider.name,
      providerPhoto: provider.photo,
      date: selectedDate,
      time: selectedTime,
      duration: consultation.duration,
      price: consultation.price,
      includesVideoCall: consultation.includesVideoCall,
      status: "pending_approval",
      contactInfo,
      message,
      createdAt: new Date().toISOString(),
    };

    onBookingConfirmed(booking);
    setIsSubmitting(false);
    onClose();

    // Reset form
    setSelectedDate("");
    setSelectedTime("");
    setMessage("");
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
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
        ru: "Забронировать сессию",
        en: "Book Session",
        et: "Broneeri sessioon",
      }}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Consultation Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {consultation.title}
              </h3>
              <p className="text-sm text-gray-600">
                <LanguageText ru="с" en="with" et="koos" /> {provider.name}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {consultation.duration}
            </div>
            <div className="flex items-center">
              <span className="font-medium">{consultation.price}</span>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LanguageText ru="Дата" en="Date" et="Kuupäev" />
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LanguageText ru="Время" en="Time" et="Kellaaeg" />
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
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

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            <LanguageText
              ru="Контактная информация"
              en="Contact Information"
              et="Kontaktandmed"
            />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <LanguageText ru="Имя" en="Name" et="Nimi" />
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    handleContactInfoChange("name", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <LanguageText ru="Email" en="Email" et="E-post" />
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    handleContactInfoChange("email", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <LanguageText ru="Телефон" en="Phone" et="Telefon" />
              <span className="text-xs text-gray-500 ml-1">
                <LanguageText
                  ru="необязательно"
                  en="optional"
                  et="valikuline"
                />
              </span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) =>
                  handleContactInfoChange("phone", e.target.value)
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <LanguageText
              ru="Дополнительное сообщение"
              en="Additional Message"
              et="Lisasõnum"
            />
            <span className="text-xs text-gray-500 ml-1">
              <LanguageText ru="необязательно" en="optional" et="valikuline" />
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={
              currentLanguage === "ru"
                ? "Расскажите о вашем проекте или задайте вопросы..."
                : currentLanguage === "en"
                  ? "Tell us about your project or ask questions..."
                  : "Rääkige oma projektist või esitage küsimusi..."
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <LanguageText ru="Отмена" en="Cancel" et="Tühista" />
          </button>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !selectedDate ||
              !selectedTime ||
              !contactInfo.name ||
              !contactInfo.email
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <LanguageText
                  ru="Бронирование..."
                  en="Booking..."
                  et="Broneerin..."
                />
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                <LanguageText
                  ru="Подтвердить бронирование"
                  en="Confirm Booking"
                  et="Kinnita broneering"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
