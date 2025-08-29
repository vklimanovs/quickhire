import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { AlertTriangle, Loader2, X } from "lucide-react";
import LanguageText from "./LanguageText";
import FormField from "./FormField";
import Button from "./Button";
import Modal from "./Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  type?: "danger" | "warning" | "info";
  requiresTyping?: boolean;
  typeToConfirm?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  type = "danger",
  requiresTyping = false,
  typeToConfirm = "DELETE",
  isLoading = false,
}: ConfirmationModalProps) {
  const { currentLanguage } = useLanguage();
  const [typedText, setTypedText] = useState("");

  const canConfirm = requiresTyping ? typedText === typeToConfirm : true;

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-red-600";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-50";
      case "warning":
        return "bg-orange-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-red-50";
    }
  };

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={true}>
      {/* Header */}
      <div className={`${getBgColor()} p-6 rounded-t-xl border-b`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${getBgColor()}`}>
            <AlertTriangle className={`h-6 w-6 ${getIconColor()}`} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">{message}</p>

        {requiresTyping && (
          <FormField
            label={{
              ru: `Для подтверждения введите "${typeToConfirm}"`,
              en: `To confirm, type "${typeToConfirm}"`,
              et: `Kinnitamiseks sisestage "${typeToConfirm}"`,
            }}
            type="text"
            value={typedText}
            onChange={(value) => setTypedText(value)}
            placeholder={{
              ru: typeToConfirm,
              en: typeToConfirm,
              et: typeToConfirm,
            }}
            disabled={isLoading}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 rounded-b-xl">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          text={{
            ru: "Отмена",
            en: "Cancel",
            et: "Tühista",
          }}
        />
        <Button
          variant={
            type === "danger"
              ? "danger"
              : type === "warning"
                ? "warning"
                : "primary"
          }
          onClick={handleConfirm}
          disabled={!canConfirm || isLoading}
          loading={isLoading}
          text={{
            ru: confirmText || "Подтвердить",
            en: confirmText || "Confirm",
            et: confirmText || "Kinnita",
          }}
        />
      </div>
    </Modal>
  );
}
