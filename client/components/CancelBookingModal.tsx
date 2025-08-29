import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import Card from "./Card";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    consultationTitle: string;
    providerName: string;
    date: string;
    time: string;
  };
  onCancel: (bookingId: string) => void;
}

export default function CancelBookingModal({
  isOpen,
  onClose,
  booking,
  onCancel,
}: CancelBookingModalProps) {
  const { currentLanguage } = useLanguage();

  const handleCancel = () => {
    onCancel(booking.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card shadow="lg" padding="none" className="max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentLanguage === "ru"
              ? "Отменить бронирование"
              : currentLanguage === "en"
                ? "Cancel Booking"
                : "Tühista broneering"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-700">
                {currentLanguage === "ru"
                  ? "Вы уверены, что хотите отменить это бронирование?"
                  : currentLanguage === "en"
                    ? "Are you sure you want to cancel this booking?"
                    : "Kas olete kindel, et soovite selle broneeringu tühistada?"}
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">
              {booking.consultationTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {currentLanguage === "ru"
                ? "с"
                : currentLanguage === "en"
                  ? "with"
                  : "koos"}{" "}
              {booking.providerName}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {new Date(booking.date).toLocaleDateString()}{" "}
              {currentLanguage === "ru" ? "в" : "at"} {booking.time}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {currentLanguage === "ru"
              ? "Это действие нельзя отменить. Провайдер будет уведомлен об отмене."
              : currentLanguage === "en"
                ? "This action cannot be undone. The provider will be notified of the cancellation."
                : "Seda toimingut ei saa tagasi võtta. Teenusepakkujat teavitatakse tühistamisest."}
          </p>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {currentLanguage === "ru"
              ? "Оставить"
              : currentLanguage === "en"
                ? "Keep Booking"
                : "Jäta alles"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            {currentLanguage === "ru"
              ? "Да, отменить"
              : currentLanguage === "en"
                ? "Yes, Cancel"
                : "Jah, tühista"}
          </button>
        </div>
      </Card>
    </div>
  );
}
