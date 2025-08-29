import React from "react";
import { X, Trash2 } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import LanguageText from "../common/LanguageText";
import CustomButton from "../forms/Button";
import Modal from "../modals/Modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  type: "service" | "consultation";
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  type,
}: DeleteConfirmationModalProps) {
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  const getTypeText = () => {
    if (type === "service") {
      return <LanguageText ru="услугу" en="service" et="teenust" />;
    } else {
      return (
        <LanguageText
          ru="консультацию"
          en="consultation"
          et="konsultatsiooni"
        />
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        ru: "Подтвердить удаление",
        en: "Confirm Deletion",
        et: "Kinnita kustutamine",
      }}
      size="md"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-gray-700">
              <LanguageText
                ru={`Вы уверены, что хотите удалить ${getTypeText()}`}
                en={`Are you sure you want to delete this ${getTypeText()}`}
                et={`Kas olete kindel, et soovite ${getTypeText()} kustutada`}
              />
            </p>
            <p className="font-medium text-gray-900 mt-1">"{title}"?</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          <LanguageText
            ru="Это действие нельзя отменить."
            en="This action cannot be undone."
            et="Seda toimingut ei saa tagasi võtta."
          />
        </p>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <LanguageText ru="Отмена" en="Cancel" et="Tühista" />
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <LanguageText ru="Удалить" en="Delete" et="Kustuta" />
        </button>
      </div>
    </Modal>
  );
}
