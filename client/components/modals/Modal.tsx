import React from "react";
import { X } from "lucide-react";
import LanguageText from "../common/LanguageText";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: {
    ru: string;
    en: string;
    et: string;
  };
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 ${className}`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              <LanguageText ru={title.ru} en={title.en} et={title.et} />
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Specialized modal variants
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = { ru: "Подтвердить", en: "Confirm", et: "Kinnita" },
  cancelText = { ru: "Отмена", en: "Cancel", et: "Tühista" },
  variant = "danger",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: { ru: string; en: string; et: string };
  message: { ru: string; en: string; et: string };
  confirmText?: { ru: string; en: string; et: string };
  cancelText?: { ru: string; en: string; et: string };
  variant?: "danger" | "warning" | "info";
}) => {
  const variantClasses = {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    info: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <p className="text-gray-700 mb-6">
          <LanguageText ru={message.ru} en={message.en} et={message.et} />
        </p>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <LanguageText
              ru={cancelText.ru}
              en={cancelText.en}
              et={cancelText.et}
            />
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-lg transition-colors ${variantClasses[variant]}`}
          >
            <LanguageText
              ru={confirmText.ru}
              en={confirmText.en}
              et={confirmText.et}
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};
