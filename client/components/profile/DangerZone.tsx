import React from "react";
import { useLanguage } from "../../lib/LanguageContext";

interface DangerZoneProps {
  onDeleteAccount: () => void;
  className?: string;
}

export default function DangerZone({
  onDeleteAccount,
  className = "",
}: DangerZoneProps) {
  const { currentLanguage } = useLanguage();

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        {currentLanguage === "ru"
          ? "Опасная зона"
          : currentLanguage === "en"
            ? "Danger Zone"
            : "Ohtlik tsoon"}
      </h3>
      <p className="text-sm text-red-700 mb-4">
        {currentLanguage === "ru"
          ? "Удаление аккаунта необратимо. Все ваши данные будут потеряны."
          : currentLanguage === "en"
            ? "Deleting your account is irreversible. All your data will be lost."
            : "Konto kustutamine on pöördumatu. Kõik teie andmed lähevad kaotsi."}
      </p>
      <button
        onClick={onDeleteAccount}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
      >
        {currentLanguage === "ru"
          ? "Удалить аккаунт"
          : currentLanguage === "en"
            ? "Delete Account"
            : "Kustuta konto"}
      </button>
    </div>
  );
}
