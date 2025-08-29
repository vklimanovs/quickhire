import React, { useState } from "react";
import { X, Check, Loader } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";
import Card from "./Card";

interface GateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionName?: string;
}

export default function GateModal({
  isOpen,
  onClose,
  onSuccess,
  actionName = "this action",
}: GateModalProps) {
  const { currentLanguage } = useLanguage();
  const { user, addClientRole, switchRole } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSwitchAndContinue = async () => {
    setIsProcessing(true);
    try {
      // If user already has client role with active subscription, just switch
      if (user?.roles.isClient && user?.subscription?.status === "active") {
        await switchRole("customer");
        onSuccess();
        return;
      }

      // Add client role with subscription
      await addClientRole();

      toast({
        title:
          currentLanguage === "ru"
            ? "Подписка активирована!"
            : currentLanguage === "en"
              ? "Subscription activated!"
              : "Tellimus aktiveeritud!",
        description:
          currentLanguage === "ru"
            ? "Теперь вы можете продолжить"
            : currentLanguage === "en"
              ? "You can now continue"
              : "Nüüd saate jätkata",
      });

      onSuccess();
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка активации"
            : currentLanguage === "en"
              ? "Activation failed"
              : "Aktiveerimise viga",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 min-h-screen">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <Card
        shadow="lg"
        padding="md"
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {currentLanguage === "ru"
              ? "Станьте клиентом, чтобы продолжить"
              : currentLanguage === "en"
                ? "Become a Customer to continue"
                : "Saage kliendiks, et jätkata"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {currentLanguage === "ru"
            ? "Публикация задач и связь с исполнителями требует активной подписки клиента."
            : currentLanguage === "en"
              ? "Posting tasks and contacting providers requires an active Customer subscription."
              : "Ülesannete postitamine ja teenusepakkujatega suhtlemine nõuab aktiivset kliendi tellimust."}
        </p>

        {/* Plan Selection */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`w-full p-4 border rounded-lg transition-colors ${
              selectedPlan === "monthly"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === "ru"
                    ? "Месячный план"
                    : currentLanguage === "en"
                      ? "Monthly Plan"
                      : "Kuuüüritus"}
                </div>
                <div className="text-sm text-gray-500">€10/month</div>
              </div>
              {selectedPlan === "monthly" && (
                <Check className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`w-full p-4 border rounded-lg transition-colors ${
              selectedPlan === "yearly"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-medium">
                  {currentLanguage === "ru"
                    ? "Годовой план"
                    : currentLanguage === "en"
                      ? "Annual Plan"
                      : "Aastane plaan"}
                </div>
                <div className="text-sm text-gray-500">€100/year</div>
                <div className="text-xs text-green-600">
                  {currentLanguage === "ru"
                    ? "Скидка 17%"
                    : currentLanguage === "en"
                      ? "17% discount"
                      : "17% allahindlus"}
                </div>
              </div>
              {selectedPlan === "yearly" && (
                <Check className="h-5 w-5 text-blue-500" />
              )}
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {currentLanguage === "ru"
              ? "Отменить"
              : currentLanguage === "en"
                ? "Cancel"
                : "Tühista"}
          </button>

          <button
            onClick={handleSwitchAndContinue}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {currentLanguage === "ru"
                  ? "Переключить и продолжить"
                  : currentLanguage === "en"
                    ? "Switch & Continue"
                    : "Lülita ja jätka"}
              </>
            )}
          </button>
        </div>
      </Card>
    </div>
  );
}
