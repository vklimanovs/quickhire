import React, { useState, useEffect } from "react";
import { X, Save, Video } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import CustomCard from "../forms/Card";

interface Consultation {
  id?: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  includesVideoCall?: boolean;
}

interface ConsultationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (consultation: Consultation) => void;
  consultation?: Consultation | null;
  mode: "add" | "edit";
}

export default function ConsultationEditModal({
  isOpen,
  onClose,
  onSave,
  consultation,
  mode,
}: ConsultationEditModalProps) {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState<Consultation>({
    title: "",
    description: "",
    duration: "",
    price: "",
    includesVideoCall: false,
  });

  useEffect(() => {
    if (consultation && mode === "edit") {
      setFormData(consultation);
    } else {
      setFormData({
        title: "",
        description: "",
        duration: "",
        price: "",
        includesVideoCall: false,
      });
    }
  }, [consultation, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.duration.trim() ||
      !formData.price.trim()
    ) {
      return;
    }

    onSave({
      ...formData,
      id: consultation?.id || Date.now().toString(),
    });
    onClose();
  };

  const handleChange = (field: keyof Consultation, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <CustomCard
        shadow="lg"
        padding="none"
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "add"
              ? currentLanguage === "ru"
                ? "Добавить консультацию"
                : currentLanguage === "en"
                  ? "Add Consultation"
                  : "Lisa konsultatsioon"
              : currentLanguage === "ru"
                ? "Редактировать консультацию"
                : currentLanguage === "en"
                  ? "Edit Consultation"
                  : "Muuda konsultatsiooni"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Название консультации"
                : currentLanguage === "en"
                  ? "Consultation Title"
                  : "Konsultatsiooni nimetus"}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={
                currentLanguage === "ru"
                  ? "Введите название консультации"
                  : currentLanguage === "en"
                    ? "Enter consultation title"
                    : "Sisestage konsultatsiooni nimetus"
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Описание"
                : currentLanguage === "en"
                  ? "Description"
                  : "Kirjeldus"}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={
                currentLanguage === "ru"
                  ? "Опишите вашу консультацию..."
                  : currentLanguage === "en"
                    ? "Describe your consultation..."
                    : "Kirjeldage oma konsultatsiooni..."
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLanguage === "ru"
                  ? "Длительность"
                  : currentLanguage === "en"
                    ? "Duration"
                    : "Kestus"}
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  currentLanguage === "ru"
                    ? "60 минут, 1.5 часа и т.д."
                    : currentLanguage === "en"
                      ? "60 minutes, 1.5 hours, etc."
                      : "60 minutit, 1,5 tundi jne."
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLanguage === "ru"
                  ? "Цена"
                  : currentLanguage === "en"
                    ? "Price"
                    : "Hind"}
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  currentLanguage === "ru"
                    ? "€150 за сессию"
                    : currentLanguage === "en"
                      ? "€150 per session"
                      : "€150 sessiooni kohta"
                }
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.includesVideoCall || false}
                onChange={(e) =>
                  handleChange("includesVideoCall", e.target.checked)
                }
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded ${formData.includesVideoCall ? "bg-blue-600 border-blue-600" : "border-gray-300"} mr-3 flex items-center justify-center`}
              >
                {formData.includesVideoCall && (
                  <Video className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {currentLanguage === "ru"
                  ? "Включает видеозвонок"
                  : currentLanguage === "en"
                    ? "Includes video call"
                    : "Sisaldab videokõnet"}
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {currentLanguage === "ru"
                ? "Отмена"
                : currentLanguage === "en"
                  ? "Cancel"
                  : "Tühista"}
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {currentLanguage === "ru"
                ? "Сохранить"
                : currentLanguage === "en"
                  ? "Save"
                  : "Salvesta"}
            </button>
          </div>
        </form>
      </CustomCard>
    </div>
  );
}
