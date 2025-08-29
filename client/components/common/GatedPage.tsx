import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { useSubscription } from "../../lib/SubscriptionContext";
import CustomCard from "../forms/Card";

interface GatedPageProps {
  intent?: "view-profile" | "book-consultation";
  backPath?: string;
}

export default function GatedPage({
  intent = "view-profile",
  backPath,
}: GatedPageProps) {
  const { currentLanguage, t } = useLanguage();
  const { openSubscriptionModal } = useSubscription();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    openSubscriptionModal(intent);
  };

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <CustomCard shadow="lg" padding="lg" className="max-w-md w-full text-center">
        {/* Lock Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t.gating.title}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          {intent === "view-profile"
            ? t.gating.body.viewProfile
            : t.gating.body.generic}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <button
            onClick={handleSubscribe}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {t.gating.cta.subscribe}
          </button>

          {/* Secondary CTA */}
          <Link
            to={`/${currentLanguage}/pricing#client-pass`}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors inline-block"
          >
            {t.gating.cta.learn}
          </Link>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.gating.cta.back}
          </button>
        </div>

        {/* URL params for tracking */}
        <div className="mt-6 text-xs text-gray-400">
          {currentLanguage === "ru"
            ? "Исходник: gating"
            : currentLanguage === "en"
              ? "Source: gating"
              : "Allikas: gating"}
        </div>
      </CustomCard>
    </div>
  );
}
