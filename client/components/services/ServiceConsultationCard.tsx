import React, { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useToast } from "../../hooks/use-toast";
import {
  Edit,
  Trash2,
  Save,
  X,
  Clock,
  Video,
  Euro,
  Loader2,
  CheckCircle,
} from "lucide-react";

interface Service {
  id?: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
}

interface Consultation {
  id?: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  includesVideoCall?: boolean;
}

interface ServiceConsultationCardProps {
  item: Service | Consultation;
  type: "service" | "consultation";
  onEdit: (item: Service | Consultation) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
  onSave?: (item: Service | Consultation) => void;
  onCancel?: () => void;
  showClientActions?: boolean; // Show Get Quote / Book Session buttons
}

export default function ServiceConsultationCard({
  item,
  type,
  onEdit,
  onDelete,
  isEditing = false,
  onSave,
  onCancel,
  showClientActions = false,
}: ServiceConsultationCardProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Edit form state
  const [editData, setEditData] = useState(item);

  const handleSave = async () => {
    if (!onSave) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave(editData);

      toast({
        title:
          currentLanguage === "ru"
            ? `${type === "service" ? "Услуга" : "Консультация"} обновле��а!`
            : currentLanguage === "en"
              ? `${type === "service" ? "Service" : "Consultation"} updated!`
              : `${type === "service" ? "Teenus" : "Konsultatsioon"} uuendatud!`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка со��ранения"
            : currentLanguage === "en"
              ? "Save failed"
              : "Salvestamine ebaõnnestus",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    onDelete(item.id || "");
  };

  const isService = type === "service";
  const service = item as Service;
  const consultation = item as Consultation;

  if (isEditing) {
    return (
      <div
        className={`border-2 rounded-lg p-6 ${
          isService
            ? "border-blue-200 bg-blue-50"
            : "border-teal-200 bg-teal-50"
        }`}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full text-lg font-semibold border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            placeholder={
              currentLanguage === "ru"
                ? `Название ${isService ? "услуги" : "консультации"}`
                : currentLanguage === "en"
                  ? `${isService ? "Service" : "Consultation"} title`
                  : `${isService ? "Teenuse" : "Konsultatsiooni"} nimetus`
            }
            disabled={isLoading}
          />

          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
            placeholder={
              currentLanguage === "ru"
                ? `Описание ${isService ? "услуги" : "консультации"}...`
                : currentLanguage === "en"
                  ? `${isService ? "Service" : "Consultation"} description...`
                  : `${isService ? "Teenuse" : "Konsultatsiooni"} kirjeldus...`
            }
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder={
                currentLanguage === "ru"
                  ? "Цена (например, €75/час, $500 фикс)"
                  : currentLanguage === "en"
                    ? "Price (e.g. €75/hour, $500 fixed)"
                    : "Hind (nt. €75/tund, $500 fikseeritud)"
              }
              disabled={isLoading}
            />

            <input
              type="text"
              value={isService ? service.deliveryTime : consultation.duration}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  [isService ? "deliveryTime" : "duration"]: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder={
                isService
                  ? currentLanguage === "ru"
                    ? "Срок (например, 2-4 недели, 1 месяц)"
                    : currentLanguage === "en"
                      ? "Delivery (e.g. 2-4 weeks, 1 month)"
                      : "Täitmisaeg (nt. 2-4 nädalat, 1 kuu)"
                  : currentLanguage === "ru"
                    ? "Длительность (45 мин, 1,5 часа)"
                    : currentLanguage === "en"
                      ? "Duration (45 min, 1.5 hours)"
                      : "Kestus (45 min, 1,5 tundi)"
              }
              disabled={isLoading}
            />
          </div>

          {!isService && (
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id={`video-call-${item.id}`}
                checked={(editData as Consultation).includesVideoCall || false}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    includesVideoCall: e.target.checked,
                  } as Consultation)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label
                htmlFor={`video-call-${item.id}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {currentLanguage === "ru"
                  ? "Включает видеозвонок"
                  : currentLanguage === "en"
                    ? "Includes Video Call"
                    : "Sisaldab videokõnet"}
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2 inline" />
              {currentLanguage === "ru"
                ? "Отмена"
                : currentLanguage === "en"
                  ? "Cancel"
                  : "Tühista"}
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center disabled:opacity-50 ${
                isService
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Save className="h-4 w-4 mr-2" />
              {currentLanguage === "ru"
                ? "Сохранить"
                : currentLanguage === "en"
                  ? "Save"
                  : "Salvesta"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow relative group ${
        isService ? "bg-white" : "bg-teal-50 border-teal-200"
      }`}
    >
      {/* Action buttons */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="pr-20">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-4 text-sm text-gray-500 mb-2 sm:mb-0">
            <div className="flex items-center">
              <Euro className="h-4 w-4 mr-1" />
              <span className="font-medium text-gray-900">{item.price}</span>
            </div>

            <div className="flex items-center">
              {isService ? (
                <>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {currentLanguage === "ru"
                      ? "Выполнение"
                      : currentLanguage === "en"
                        ? "Delivery"
                        : "Täitmisaeg"}
                    : {service.deliveryTime}
                  </span>
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-1" />
                  <span>{consultation.duration}</span>
                </>
              )}
            </div>

            {!isService && consultation.includesVideoCall && (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-700 text-sm font-medium">
                  {currentLanguage === "ru"
                    ? "Видеозвонок"
                    : currentLanguage === "en"
                      ? "Video Call"
                      : "Videokõne"}
                </span>
              </div>
            )}
          </div>

          {showClientActions && (
            <>
              {isService && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  {currentLanguage === "ru"
                    ? "Получить предложение"
                    : currentLanguage === "en"
                      ? "Get Quote"
                      : "Küsi hinnapakkumist"}
                </button>
              )}

              {!isService && (
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  {currentLanguage === "ru"
                    ? "Забронировать"
                    : currentLanguage === "en"
                      ? "Book Session"
                      : "Broneeri seanss"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
