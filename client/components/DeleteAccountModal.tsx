import React, { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const { currentLanguage } = useLanguage();
  const { deleteAccount } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    if (!password) return;
    setIsLoading(true);

    try {
      await deleteAccount(password);

      toast({
        title:
          currentLanguage === "ru"
            ? "Аккаунт удален"
            : currentLanguage === "en"
              ? "Account deleted"
              : "Konto kustutatud",
        description:
          currentLanguage === "ru"
            ? "Ваш аккаунт был успешно удален"
            : currentLanguage === "en"
              ? "Your account has been successfully deleted"
              : "Teie konto on edukalt kustutatud",
        variant: "destructive",
      });
      // Redirect is handled inside deleteAccount
    } catch (error: unknown) {
      console.error("Error deleting account:", error);
      const fallback =
        currentLanguage === "ru"
          ? "Неверный пароль или проблема с с��рвером"
          : currentLanguage === "en"
            ? "Incorrect password or server issue"
            : "Vale parool või serveri probleem";

      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : fallback;

      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка удаления"
            : currentLanguage === "en"
              ? "Delete failed"
              : "Kustutamine ebaõnnestus",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal closes
  const handleClose = () => {
    setPassword("");
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {currentLanguage === "ru"
              ? "Удалить аккаунт"
              : currentLanguage === "en"
                ? "Delete account"
                : "Kustuta konto"}
          </h2>

          <p className="text-gray-700 mb-6">
            {currentLanguage === "ru"
              ? "Удаление аккаунта необратимо. Все ваши данные будут потеряны."
              : currentLanguage === "en"
                ? "Deleting your account is irreversible. All your data will be lost."
                : "Konto kustutamine on tagasipöördumatu. Kõik teie andmed lähevad kaotsi."}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === "ru"
                ? "Введите пароль для подтверждения"
                : currentLanguage === "en"
                  ? "Password (required)"
                  : "Parool (nõutav)"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {currentLanguage === "ru"
                ? "Отмена"
                : currentLanguage === "en"
                  ? "Cancel"
                  : "Tühista"}
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center"
              disabled={!password || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {currentLanguage === "ru"
                    ? "Удаление..."
                    : currentLanguage === "en"
                      ? "Deleting..."
                      : "Kustutamine..."}
                </>
              ) : currentLanguage === "ru" ? (
                "Удалить"
              ) : currentLanguage === "en" ? (
                "Delete"
              ) : (
                "Kustuta"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
