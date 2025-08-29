import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import GatedPage from "../components/GatedPage";
import StandardTagInput from "../components/StandardTagInput";
import Card from "../components/Card";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useSubscription } from "../lib/SubscriptionContext";
import { useToast } from "../hooks/use-toast";
import {
  SIMPLE_SKILL_SUGGESTIONS,
  SIMPLE_LANGUAGE_SUGGESTIONS,
} from "../data/suggestions";
import GateModal from "../components/GateModal";
import { useGate } from "../hooks/useGate";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  Edit,
  Save,
  Camera,
  Plus,
  Trash2,
  Settings,
  Phone,
  Mail,
} from "lucide-react";

// Simplified mock provider data that uses translation system
const getProviderData = (id: string, t: any, currentLanguage: string) => {
  // For now, we'll use the existing provider data structure but make it work
  if (id === "1") {
    return {
      id: 1,
      name: "Sarah Chen",
      title: t.providerData.sarahChen.title,
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      location: t.locations.tallinnEstonia,
      joinedDate:
        currentLanguage === "et"
          ? "Märts 2022"
          : currentLanguage === "ru"
            ? "Март 2022"
            : "March 2022",
      rating: 4.9,
      reviews: 127,
      completedProjects: 89,
      responseTime: t.responseTimes.twoHours,
      availability: {
        state: "available" as const,
        awayFrom: undefined,
        awayUntil: undefined,
        awayMessage: undefined,
      },
      bio: t.providerData.sarahChen.bio,
      phone: "+372 5555 1234",
      email: "sarah.chen@quickhire.ee",
      privacySettings: {
        showPhone: true,
        showEmail: true,
      },
      skills: [
        "react",
        "nodejs",
        "typescript",
        "aws",
        "postgresql",
        "graphql",
        "python",
        "docker",
      ],
      languages:
        currentLanguage === "et"
          ? [
              "Inglise keel (emakeel)",
              "Hiina keel (vabalt)",
              "Hispaania keel (vestlustase)",
            ]
          : currentLanguage === "ru"
            ? [
                "Английский (р��дной)",
                "Китайский (свободно)",
                "Испанский (разговорный)",
              ]
            : [
                "English (Native)",
                "Mandarin (Fluent)",
                "Spanish (Conversational)",
              ],
      services: [
        {
          title:
            currentLanguage === "et"
              ? "Full-Stack veebirakenduste arendus"
              : currentLanguage === "ru"
                ? "Full-Stack веб-разработка"
                : "Full-Stack Web Development",
          description:
            currentLanguage === "et"
              ? "Täielik veebirakenduste arendus front-end'ist back-end'ini, sealhulgas andmebaasi disain ja paigaldus."
              : currentLanguage === "ru"
                ? "Полная разра��отка веб-приложений от фронтенда до бэк��нда, включая проектирование базы данных и развертывание."
                : "Complete web application development from frontend to backend, including database design and deployment.",
          price:
            currentLanguage === "et"
              ? "Alates €75/tund"
              : currentLanguage === "ru"
                ? "От $75/час"
                : "Starting at $75/hour",
          deliveryTime:
            currentLanguage === "et"
              ? "2-4 nädalat"
              : currentLanguage === "ru"
                ? "2-4 недели"
                : "2-4 weeks",
        },
      ],
      consultations: [
        {
          title:
            currentLanguage === "et"
              ? "Tehnilise arhitektuuri ülevaatus"
              : currentLanguage === "ru"
                ? "Обзор технической архитектуры"
                : "Technical Architecture Review",
          description:
            currentLanguage === "et"
              ? "Saa eksperdi nõu oma rakenduse arhitektuuri, skaleeritavuse ja parimate tavade kohta."
              : currentLanguage === "ru"
                ? "Получите экспертный совет по архитектуре прил��жения, масштабируемости и лучшим практикам."
                : "Get expert advice on your application architecture, scalability, and best practices.",
          duration:
            currentLanguage === "et"
              ? "60 minutit"
              : currentLanguage === "ru"
                ? "60 минут"
                : "60 minutes",
          price: "€150",
        },
      ],
      portfolio: [
        {
          title:
            currentLanguage === "et"
              ? "E-kaubanduse platvorm"
              : currentLanguage === "ru"
                ? "E-commerce платформа"
                : "E-commerce Platform",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
          description:
            currentLanguage === "et"
              ? "Full-stack e-kaubanduse lahendus React ja Node.js-iga"
              : currentLanguage === "ru"
                ? "Full-stack e-commerce р��шение с React и Node.js"
                : "Full-stack e-commerce solution with React and Node.js",
        },
      ],
      recentReviews: [
        {
          client: "John D.",
          rating: 5,
          comment:
            currentLanguage === "et"
              ? "Suurepärane töö meie veebiplatvormi kallal. Sarah toimetas täpselt seda, mida vajasime õigeaegselt."
              : currentLanguage === "ru"
                ? "Отличная работа над нашей веб-пл��тформой. Сара ��ос��авила именно ��о, что нам ��ужно, вовремя."
                : "Excellent work on our web platform. Sarah delivered exactly what we needed on time.",
          date:
            currentLanguage === "et"
              ? "2 nädalat tagasi"
              : currentLanguage === "ru"
                ? "2 недели назад"
                : "2 weeks ago",
        },
      ],
    };
  }
  return null;
};

// Helper function to get skill translation
function getSkillTranslation(skillKey: string, t: any): string {
  return t.skills[skillKey] || skillKey;
}

// Helper function to determine if contact info should be visible
function shouldShowContactInfo(
  provider: any,
  user: any,
  isClientSubscribed: boolean,
  fieldType: "phone" | "email",
): { show: boolean; reason?: string } {
  // If provider has disabled this field in privacy settings, never show it
  if (fieldType === "phone" && !provider.privacySettings?.showPhone) {
    return { show: false, reason: "privacy" };
  }
  if (fieldType === "email" && !provider.privacySettings?.showEmail) {
    return { show: false, reason: "privacy" };
  }

  // If viewer is a provider (regardless of subscription), never show contact info
  if (user?.accountType === "provider") {
    return { show: false, reason: "provider_restriction" };
  }

  // If viewer is a customer but doesn't have active subscription, don't show
  if (user?.accountType === "customer" && !isClientSubscribed) {
    return { show: false, reason: "subscription_required" };
  }

  // If viewer is a customer with active subscription and provider allows it, show it
  if (user?.accountType === "customer" && isClientSubscribed) {
    return { show: true };
  }

  // For non-authenticated users, don't show contact info
  return { show: false, reason: "authentication_required" };
}

export default function ProviderProfile() {
  const { id } = useParams();
  const { currentLanguage, t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { isClientSubscribed, openSubscriptionModal } = useSubscription();
  const { toast } = useToast();

  const messageGate = useGate({
    actionName: "Message Provider",
    onSuccess: () => {
      // Handle successful gate passage for messaging
      sendMessage();
    },
  });

  // Single source of truth for role checks
  const isFreelance = user?.roles?.isFreelance === true;
  const isClient = user?.roles?.isClient === true;
  const finalIsClientSubscribed =
    isClient && user?.subscription?.status === "active";

  const sendMessage = () => {
    // TODO: Integrate with global chat context
    toast({
      title:
        currentLanguage === "ru"
          ? "Функция в разработке"
          : currentLanguage === "en"
            ? "Feature in development"
            : "Funktsioon arendamisel",
      description:
        currentLanguage === "ru"
          ? `Система сообщений скоро будет доступна! Вы хотели связаться с ${provider.name}`
          : currentLanguage === "en"
            ? `Chat feature coming soon! You wanted to contact ${provider.name}`
            : `Vestlusfunktsioon tuleb peagi! Te tahtsid ühendust võtta ${provider.name}`,
      variant: "default",
    });
  };

  // Hard block: If user is freelance-only (no client subscription), show gated page
  if (isAuthenticated && isFreelance && !finalIsClientSubscribed) {
    return (
      <GatedPage
        intent="view-profile"
        backPath={`/${currentLanguage}/providers`}
      />
    );
  }

  // Soft block: If user is not authenticated or is client without subscription, show gated page
  if (!isAuthenticated || (isClient && !finalIsClientSubscribed)) {
    return (
      <GatedPage
        intent="view-profile"
        backPath={`/${currentLanguage}/providers`}
      />
    );
  }

  const provider = getProviderData(id || "1", t, currentLanguage);

  // Check if current user is the profile owner
  const isOwnProfile =
    isAuthenticated &&
    user &&
    user.accountType === "provider" &&
    (id === "1" ||
      user.email === "sarah.provider@quickhire.ee" ||
      user.email === "sarah.provider@gmail.com");

  // Note: Profile editing is now handled in the dashboard
  const isEditMode = false;
  const editData = null;

  // Note: Gating is now handled before component render, no need for auto-trigger modal

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-6xl font-bold text-blue-100 block">
                404
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t.providerProfile.providerNotFound}
            </h1>
            <p className="text-gray-600 mb-8">{t.notFound.pageNotFoundDesc}</p>
            <Link
              to={`/${currentLanguage}/providers`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.providers.title}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check subscription access
  if (!isClientSubscribed && user?.accountType === "customer") {
    // Show gated state with blurred skeleton and subscription modal
    return (
      <div className="min-h-screen bg-gray-50">
        <SEO
          title={`${provider.name} - ${provider.title} | QuickHire.ee`}
          description={`Hire ${provider.name}, a skilled ${provider.title} in ${provider.location}. ${provider.bio.substring(0, 120)}...`}
          keywords={`${provider.name}, ${provider.title}, ${provider.skills.join(", ")}, ${provider.location}`}
        />
        <Navigation />

        {/* Blurred skeleton background */}
        <div className="filter blur-sm pointer-events-none">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card padding="lg" shadow="sm" className="mb-8">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded mb-2 w-48"></div>
                  <div className="h-5 bg-gray-200 rounded mb-4 w-32"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-64"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card padding="md" shadow="sm" className="mb-6">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-32"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </Card>
              </div>
              <div>
                <Card padding="md" shadow="sm">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-24"></div>
                  <div className="space-y-3">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>

        {/* Overlay and auto-open subscription modal */}
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>

        {/* Modal is auto-triggered via useEffect below */}

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${provider.name} - ${provider.title} | QuickHire.ee`}
        description={`Hire ${provider.name}, a skilled ${provider.title} in ${provider.location}. ${provider.bio.substring(0, 120)}...`}
        keywords={`${provider.name}, ${provider.title}, ${provider.skills.join(", ")}, ${provider.location}`}
        url={`https://quickhire.ee/${currentLanguage}/provider/${provider.id}`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Header */}
        <Card border shadow="sm" padding="lg" className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Left Side - Photo and Basic Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">
                    {provider.rating}
                  </span>
                  <span className="text-gray-500">
                    ({provider.reviews} {t.common.reviews})
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {provider.completedProjects}{" "}
                  {t.providerProfile.projectsCompleted}
                </p>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {provider.name}
                    </h1>
                    {provider.availability.state !== "available" && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
                        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                        {provider.availability.state !== "available"
                          ? currentLanguage === "ru"
                            ? "Не в сети"
                            : currentLanguage === "en"
                              ? "Offline"
                              : "Võrguühenduseta"
                          : currentLanguage === "ru"
                            ? "На перерыве"
                            : currentLanguage === "en"
                              ? "On break"
                              : "Puhkusel"}
                        {provider.availability.awayUntil && (
                          <span className="ml-2 text-xs">
                            {currentLanguage === "ru"
                              ? "до"
                              : currentLanguage === "en"
                                ? "until"
                                : "kuni"}{" "}
                            {new Date(
                              provider.availability.awayUntil,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-xl text-gray-600 mb-4">{provider.title}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {t.common.joined} {provider.joinedDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {t.providerProfile.respondsIn} {provider.responseTime}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {isOwnProfile ? (
                    // Profile owner buttons - edit toggle
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          // Edit functionality disabled - handled in dashboard
                          toast({
                            title:
                              currentLanguage === "ru"
                                ? "Редактирование в панели"
                                : currentLanguage === "en"
                                  ? "Edit in Dashboard"
                                  : "Muuda armatuurlauas",
                            description:
                              currentLanguage === "ru"
                                ? "Редактирование профиля доступно в панели поставщика"
                                : currentLanguage === "en"
                                  ? "Profile editing is available in provider dashboard"
                                  : "Profiili redigeerimine on saadaval teenusepakkuja armatuurlauas",
                          });
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        {isEditMode ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            {currentLanguage === "ru"
                              ? "Сохранить"
                              : currentLanguage === "en"
                                ? "Save"
                                : "Salvesta"}
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            {currentLanguage === "ru"
                              ? "Редакти��овать"
                              : currentLanguage === "en"
                                ? "Edit Profile"
                                : "Muuda profiili"}
                          </>
                        )}
                      </button>
                      <Link
                        to={`/${currentLanguage}/dashboard/provider`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {currentLanguage === "ru"
                          ? "Панель"
                          : currentLanguage === "en"
                            ? "Dashboard"
                            : "Töölaud"}
                      </Link>
                    </div>
                  ) : (
                    // Visitor buttons
                    <>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 className="h-5 w-5 text-gray-600" />
                      </button>
                      {provider.availability.state !== "available" ? (
                        <div
                          className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed flex items-center"
                          title={
                            currentLanguage === "ru"
                              ? "Поставщик недоступен для сообщений"
                              : currentLanguage === "en"
                                ? "Provider unavailable for messages"
                                : "Teenusepakkuja pole sõnumite jaoks saadaval"
                          }
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {currentLanguage === "ru"
                            ? "Недоступен"
                            : currentLanguage === "en"
                              ? "Unavailable"
                              : "Pole saadaval"}
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            messageGate.executeWithGate(() => sendMessage())
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {currentLanguage === "ru"
                            ? "Напис��ть сообщени��"
                            : currentLanguage === "en"
                              ? "Send Message"
                              : "Saada sõnum"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Editable Bio */}
              {isEditMode && isOwnProfile ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLanguage === "ru"
                      ? "О себе"
                      : currentLanguage === "en"
                        ? "About me"
                        : "Minust"}
                  </label>
                  <textarea
                    value={editData?.bio || provider.bio}
                    onChange={(e) => {
                      // Read-only in view mode
                    }}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={
                      currentLanguage === "ru"
                        ? "Расска����ите о с��оем опыте, навыках и услугах..."
                        : currentLanguage === "en"
                          ? "Tell about your experience, skills, and services..."
                          : "Rääkige oma kogemustest, oskustest ja teenustest..."
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {isEditMode && editData?.bio ? editData.bio : provider.bio}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Ready to Start? Section - Removed for subscribed customers */}
        {false && !isOwnProfile && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.providerProfile.readyToStart}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t.providerProfile.contactProvider.replace(
                  "{name}",
                  provider.name,
                )}
              </p>
              {(() => {
                // Check if messaging should be available
                const canMessage = () => {
                  // Providers cannot message other providers
                  if (user?.accountType === "provider") {
                    return { allowed: false, reason: "provider_restriction" };
                  }

                  // Customers need active subscription to message
                  if (user?.accountType === "customer" && !isClientSubscribed) {
                    return { allowed: false, reason: "subscription_required" };
                  }

                  // Provider must be available
                  if (provider.availability.state !== "available") {
                    return { allowed: false, reason: "unavailable" };
                  }

                  // Must be authenticated
                  if (!user) {
                    return {
                      allowed: false,
                      reason: "authentication_required",
                    };
                  }

                  return { allowed: true };
                };

                const messagingStatus = canMessage();

                if (!messagingStatus.allowed) {
                  switch (messagingStatus.reason) {
                    case "provider_restriction":
                      return (
                        <div className="w-full bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium cursor-not-allowed text-center">
                          {currentLanguage === "ru"
                            ? "Поставщики не могут связываться друг с дру��ом"
                            : currentLanguage === "en"
                              ? "Providers cannot message each other"
                              : "Teenusepakkujad ei saa üksteisega suhelda"}
                        </div>
                      );

                    case "subscription_required":
                      return (
                        <button
                          onClick={() => openSubscriptionModal("view-profile")}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          {currentLanguage === "ru"
                            ? "Подписка для отправки сообщений"
                            : currentLanguage === "en"
                              ? "Subscribe to Send Message"
                              : "Tellimus sõnumi saatmiseks"}
                        </button>
                      );

                    case "unavailable":
                      return (
                        <div className="w-full bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium cursor-not-allowed text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {currentLanguage === "ru"
                                ? "Недоступен"
                                : currentLanguage === "en"
                                  ? "Unavailable"
                                  : "Pole saadaval"}
                            </span>
                            {provider.availability.awayUntil && (
                              <span className="ml-2 text-sm">
                                {currentLanguage === "ru"
                                  ? "до"
                                  : currentLanguage === "en"
                                    ? "until"
                                    : "kuni"}{" "}
                                {new Date(
                                  provider.availability.awayUntil,
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {provider.availability.awayMessage && (
                            <div className="text-xs mt-1 opacity-75">
                              {provider.availability.awayMessage}
                            </div>
                          )}
                        </div>
                      );

                    case "authentication_required":
                      return (
                        <button
                          onClick={() => {
                            // Redirect to login/signup
                            window.location.href = `/${currentLanguage}/login`;
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          {currentLanguage === "ru"
                            ? "Войти для отправки сообщения"
                            : currentLanguage === "en"
                              ? "Sign In to Send Message"
                              : "Logi sisse s��numi saatmiseks"}
                        </button>
                      );

                    default:
                      return null;
                  }
                } else {
                  return (
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      {t.providerProfile.sendMessage}
                    </button>
                  );
                }
              })()}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Section */}
            <Card border shadow="sm" padding="md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.providerProfile.services}
                </h2>
                {isEditMode && isOwnProfile && (
                  <button
                    onClick={() => {
                      const newService = {
                        title:
                          currentLanguage === "ru"
                            ? "Новая услуга"
                            : currentLanguage === "en"
                              ? "New Service"
                              : "Uus teenus",
                        description:
                          currentLanguage === "ru"
                            ? "Описание усл��ги..."
                            : currentLanguage === "en"
                              ? "Service description..."
                              : "Teenuse kirjeldus...",
                        price:
                          currentLanguage === "ru"
                            ? "От $50/��ас"
                            : currentLanguage === "en"
                              ? "Starting at $50/hour"
                              : "Alates $50/tund",
                        deliveryTime:
                          currentLanguage === "ru"
                            ? "1-2 недели"
                            : currentLanguage === "en"
                              ? "1-2 weeks"
                              : "1-2 nädalat",
                      };
                      // setEditData({
                      //   ...editData,
                      //   services: [...(editData?.services || provider.services), newService]
                      // });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {currentLanguage === "ru"
                      ? "Добавить услугу"
                      : currentLanguage === "en"
                        ? "Add Service"
                        : "Lisa teenus"}
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {(isEditMode && editData?.services
                  ? editData.services
                  : provider.services
                ).map((service, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 relative group"
                  >
                    {isEditMode && isOwnProfile && (
                      <button
                        onClick={() => {
                          // const updatedServices = (editData?.services || provider.services).filter((_, i) => i !== index);
                          // setEditData({ ...editData, services: updatedServices });
                        }}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}

                    {isEditMode && isOwnProfile ? (
                      // Edit mode fields
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            // const updatedServices = [...(editData?.services || provider.services)];
                            // updatedServices[index] = { ...service, title: e.target.value };
                            // setEditData({ ...editData, services: updatedServices });
                          }}
                          className="w-full text-lg font-semibold border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={
                            currentLanguage === "ru"
                              ? "На��вание услуги"
                              : currentLanguage === "en"
                                ? "Service title"
                                : "Teenuse nimetus"
                          }
                        />
                        <textarea
                          value={service.description}
                          onChange={(e) => {
                            // const updatedServices = [...(editData?.services || provider.services)];
                            // updatedServices[index] = { ...service, description: e.target.value };
                            // setEditData({ ...editData, services: updatedServices });
                          }}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder={
                            currentLanguage === "ru"
                              ? "Опис��ние услуги..."
                              : currentLanguage === "en"
                                ? "Service description..."
                                : "Teenuse kirjeldus..."
                          }
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={service.price}
                            onChange={(e) => {
                              // const updatedServices = [...(editData?.services || provider.services)];
                              // updatedServices[index] = { ...service, price: e.target.value };
                              // setEditData({ ...editData, services: updatedServices });
                            }}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Цена (например, $75/час)"
                                : currentLanguage === "en"
                                  ? "Price (e.g. $75/hour)"
                                  : "Hind (nt. $75/tund)"
                            }
                          />
                          <input
                            type="text"
                            value={service.deliveryTime}
                            onChange={(e) => {
                              // const updatedServices = [...(editData?.services || provider.services)];
                              // updatedServices[index] = { ...service, deliveryTime: e.target.value };
                              // setEditData({ ...editData, services: updatedServices });
                            }}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Срок выполнения (например, 2-4 недели)"
                                : currentLanguage === "en"
                                  ? "Delivery time (e.g. 2-4 weeks)"
                                  : "Täitmisaeg (nt. 2-4 nädalat)"
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex space-x-4 text-sm text-gray-500 mb-2 sm:mb-0">
                            <span className="font-medium text-gray-900">
                              {service.price}
                            </span>
                            <span>
                              {t.providerProfile.delivery}:{" "}
                              {service.deliveryTime}
                            </span>
                          </div>
                          {!isOwnProfile && (
                            <button
                              onClick={() => {
                                // TODO: Integrate with global chat context
                                toast({
                                  title:
                                    currentLanguage === "ru"
                                      ? "Функция в разработке"
                                      : currentLanguage === "en"
                                        ? "Feature in development"
                                        : "Funktsioon arendamisel",
                                  description:
                                    currentLanguage === "ru"
                                      ? "Функция чата скоро будет доступна! Вы хотели написать о: " +
                                        service.title
                                      : currentLanguage === "en"
                                        ? "Chat feature coming soon! You wanted to message about: " +
                                          service.title
                                        : "Vestlusfunktsioon tuleb peagi! Te tahatsid sõnumit saata: " +
                                          service.title,
                                  variant: "default",
                                });
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              {currentLanguage === "ru"
                                ? "Сообщен��е"
                                : currentLanguage === "en"
                                  ? "Message"
                                  : "Sõnum"}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Consultations Section */}
            {(provider.consultations.length > 0 ||
              (isEditMode && isOwnProfile)) && (
              <Card border shadow="sm" padding="md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t.providerProfile.consultationsAvailable}
                  </h2>
                  {isEditMode && isOwnProfile && (
                    <button
                      onClick={() => {
                        const newConsultation = {
                          title:
                            currentLanguage === "ru"
                              ? "Новая консультация"
                              : currentLanguage === "en"
                                ? "New Consultation"
                                : "Uus konsultatsioon",
                          description:
                            currentLanguage === "ru"
                              ? "Описание конс��льтации..."
                              : currentLanguage === "en"
                                ? "Consultation description..."
                                : "Konsultatsiooni kirjeldus...",
                          duration:
                            currentLanguage === "ru"
                              ? "60 минут"
                              : currentLanguage === "en"
                                ? "60 minutes"
                                : "60 minutit",
                          price: "€150",
                        };
                        // setEditData({
                        //   ...editData,
                        //   consultations: [...(editData?.consultations || provider.consultations), newConsultation]
                        // });
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {currentLanguage === "ru"
                        ? "Доб��в�����ть консультацию"
                        : currentLanguage === "en"
                          ? "Add Consultation"
                          : "Lisa konsultatsioon"}
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {(isEditMode && editData?.consultations
                    ? editData.consultations
                    : provider.consultations
                  ).map((consultation, index) => (
                    <div
                      key={index}
                      className="border border-teal-200 bg-teal-50 rounded-lg p-6 relative group"
                    >
                      {isEditMode && isOwnProfile && (
                        <button
                          onClick={() => {
                            // const updatedConsultations = (editData?.consultations || provider.consultations).filter((_, i) => i !== index);
                            // setEditData({ ...editData, consultations: updatedConsultations });
                          }}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}

                      {isEditMode && isOwnProfile ? (
                        // Edit mode
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={consultation.title}
                            onChange={(e) => {
                              // const updatedConsultations = [...(editData?.consultations || provider.consultations)];
                              // updatedConsultations[index] = { ...consultation, title: e.target.value };
                              // setEditData({ ...editData, consultations: updatedConsultations });
                            }}
                            className="w-full text-lg font-semibold border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Название консультации"
                                : currentLanguage === "en"
                                  ? "Consultation title"
                                  : "Konsultatsiooni nimetus"
                            }
                          />
                          <textarea
                            value={consultation.description}
                            onChange={(e) => {
                              // const updatedConsultations = [...(editData?.consultations || provider.consultations)];
                              // updatedConsultations[index] = { ...consultation, description: e.target.value };
                              // setEditData({ ...editData, consultations: updatedConsultations });
                            }}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                            placeholder={
                              currentLanguage === "ru"
                                ? "О��исание консультации..."
                                : currentLanguage === "en"
                                  ? "Consultation description..."
                                  : "Konsultatsiooni kirjeldus..."
                            }
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={consultation.duration}
                              onChange={(e) => {
                                // const updatedConsultations = [...(editData?.consultations || provider.consultations)];
                                // updatedConsultations[index] = { ...consultation, duration: e.target.value };
                                // setEditData({ ...editData, consultations: updatedConsultations });
                              }}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                              placeholder={
                                currentLanguage === "ru"
                                  ? "Длительност�� (60 минут)"
                                  : currentLanguage === "en"
                                    ? "Duration (60 minutes)"
                                    : "Kestus (60 minutit)"
                              }
                            />
                            <input
                              type="text"
                              value={consultation.price}
                              onChange={(e) => {
                                // const updatedConsultations = [...(editData?.consultations || provider.consultations)];
                                // updatedConsultations[index] = { ...consultation, price: e.target.value };
                                // setEditData({ ...editData, consultations: updatedConsultations });
                              }}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                              placeholder={
                                currentLanguage === "ru"
                                  ? "Цена (���150)"
                                  : currentLanguage === "en"
                                    ? "Price (€150)"
                                    : "Hind (€150)"
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        // View mode
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {consultation.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {consultation.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {consultation.duration}
                              </div>
                              <div className="flex items-center">
                                <Video className="h-4 w-4 mr-1" />
                                {t.providerProfile.videoCall}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-gray-900 mb-2">
                              {consultation.price}
                            </div>
                            {!isOwnProfile &&
                              (provider.availability.state !== "available" ? (
                                <div
                                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed flex items-center"
                                  title={`${provider.name} ${currentLanguage === "ru" ? "не доступе�� до" : currentLanguage === "en" ? "is away until" : "on eemal kuni"} ${provider.availability.awayUntil ? new Date(provider.availability.awayUntil).toLocaleDateString() : ""}`}
                                >
                                  {provider.availability.state === "inactive"
                                    ? currentLanguage === "ru"
                                      ? "Не в сети"
                                      : currentLanguage === "en"
                                        ? "Offline"
                                        : "Võrguühenduseta"
                                    : currentLanguage === "ru"
                                      ? "На перерыве"
                                      : currentLanguage === "en"
                                        ? "On break"
                                        : "Puhkusel"}
                                  {provider.availability.awayUntil && (
                                    <span className="ml-2 text-xs">
                                      {currentLanguage === "ru"
                                        ? "до"
                                        : currentLanguage === "en"
                                          ? "until"
                                          : "kuni"}{" "}
                                      {new Date(
                                        provider.availability.awayUntil,
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                  {t.providerProfile.bookSession}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Portfolio Section */}
            <Card border shadow="sm" padding="md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.providerProfile.portfolio}
                </h2>
                {isEditMode && isOwnProfile && (
                  <button
                    onClick={() => {
                      const newProject = {
                        title:
                          currentLanguage === "ru"
                            ? "Новый проект"
                            : currentLanguage === "en"
                              ? "New Project"
                              : "Uus projekt",
                        description:
                          currentLanguage === "ru"
                            ? "Описание проекта..."
                            : currentLanguage === "en"
                              ? "Project description..."
                              : "Projekti kirjeldus...",
                        image:
                          "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&h=300&fit=crop",
                      };
                      // setEditData({
                      //   ...editData,
                      //   portfolio: [...(editData?.portfolio || provider.portfolio), newProject]
                      // });
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {currentLanguage === "ru"
                      ? "Добавить проект"
                      : currentLanguage === "en"
                        ? "Add Project"
                        : "Lisa projekt"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(isEditMode && editData?.portfolio
                  ? editData.portfolio
                  : provider.portfolio
                ).map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow relative group"
                  >
                    {isEditMode && isOwnProfile && (
                      <button
                        onClick={() => {
                          // const updatedPortfolio = (editData?.portfolio || provider.portfolio).filter((_, i) => i !== index);
                          // setEditData({ ...editData, portfolio: updatedPortfolio });
                        }}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    {isEditMode && isOwnProfile ? (
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="h-8 w-8 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              // const file = e.target.files?.[0];
                              // if (file) {
                              //   const reader = new FileReader();
                              //   reader.onload = (event) => {
                              //     const updatedPortfolio = [...(editData?.portfolio || provider.portfolio)];
                              //     updatedPortfolio[index] = { ...project, image: event.target?.result as string };
                              //     setEditData({ ...editData, portfolio: updatedPortfolio });
                              //   };
                              //   reader.readAsDataURL(file);
                              // }
                            }}
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              // const updatedPortfolio = [...(editData?.portfolio || provider.portfolio)];
                              // updatedPortfolio[index] = { ...project, title: e.target.value };
                              // setEditData({ ...editData, portfolio: updatedPortfolio });
                            }}
                            className="w-full font-semibold border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Назва��ие проекта"
                                : currentLanguage === "en"
                                  ? "Project title"
                                  : "Projekti nimetus"
                            }
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => {
                              // const updatedPortfolio = [...(editData?.portfolio || provider.portfolio)];
                              // updatedPortfolio[index] = { ...project, description: e.target.value };
                              // setEditData({ ...editData, portfolio: updatedPortfolio });
                            }}
                            rows={2}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Описание прое��та..."
                                : currentLanguage === "en"
                                  ? "Project description..."
                                  : "Projekti kirjeldus..."
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {project.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {isEditMode && isOwnProfile ? (
                <StandardTagInput
                  value={editData?.skills || provider.skills || []}
                  onChange={(newSkills) => {
                    // setEditData({ ...editData, skills: newSkills });
                  }}
                  suggestions={SIMPLE_SKILL_SUGGESTIONS}
                  label={t.providerProfile.skills}
                  type="skills"
                />
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t.providerProfile.skills}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium"
                      >
                        {getSkillTranslation(skill, t)}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {isEditMode && isOwnProfile ? (
                <StandardTagInput
                  value={editData?.languages || provider.languages || []}
                  onChange={(newLanguages) => {
                    // setEditData({ ...editData, languages: newLanguages });
                  }}
                  suggestions={SIMPLE_LANGUAGE_SUGGESTIONS}
                  label={t.providerProfile.languages}
                  type="languages"
                />
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t.providerProfile.languages}
                  </h3>
                  <div className="space-y-2">
                    {provider.languages.map((language, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">
                          {language}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "Контактная информация"
                  : currentLanguage === "en"
                    ? "Contact Information"
                    : "Kontaktandmed"}
              </h3>
              <div className="space-y-3">
                {/* Phone Number */}
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 mr-2" />
                    {currentLanguage === "ru"
                      ? "Телефон"
                      : currentLanguage === "en"
                        ? "Phone"
                        : "Telefon"}
                  </div>
                  {(() => {
                    const phoneVisibility = shouldShowContactInfo(
                      provider,
                      user,
                      isClientSubscribed,
                      "phone",
                    );
                    if (phoneVisibility.show) {
                      return (
                        <div className="text-sm text-gray-900">
                          <a
                            href={`tel:${provider.phone}`}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {provider.phone}
                          </a>
                        </div>
                      );
                    } else {
                      switch (phoneVisibility.reason) {
                        case "privacy":
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Скрыто поставщиком"
                                : currentLanguage === "en"
                                  ? "Hidden by provider"
                                  : "Teenusepakkuja poolt peidetud"}
                            </div>
                          );
                        case "provider_restriction":
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Недоступно д��угим поставщик��м"
                                : currentLanguage === "en"
                                  ? "Not available to other providers"
                                  : "Pole kättesaadav teistele teenusepakkujatele"}
                            </div>
                          );
                        case "subscription_required":
                          return (
                            <div className="text-sm">
                              <button
                                onClick={() =>
                                  openSubscriptionModal("view-profile")
                                }
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                {currentLanguage === "ru"
                                  ? "Подписк�� требуется для просмотра"
                                  : currentLanguage === "en"
                                    ? "Subscription required to view"
                                    : "Vaatamiseks on vajalik tellimus"}
                              </button>
                            </div>
                          );
                        default:
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Войдите для просмотра"
                                : currentLanguage === "en"
                                  ? "Sign in to view"
                                  : "Vaatamiseks logige sisse"}
                            </div>
                          );
                      }
                    }
                  })()}
                </div>

                {/* Email Address */}
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {currentLanguage === "ru"
                      ? "Email"
                      : currentLanguage === "en"
                        ? "Email"
                        : "E-post"}
                  </div>
                  {(() => {
                    const emailVisibility = shouldShowContactInfo(
                      provider,
                      user,
                      isClientSubscribed,
                      "email",
                    );
                    if (emailVisibility.show) {
                      return (
                        <div className="text-sm text-gray-900">
                          <a
                            href={`mailto:${provider.email}`}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {provider.email}
                          </a>
                        </div>
                      );
                    } else {
                      switch (emailVisibility.reason) {
                        case "privacy":
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Скрыто поставщиком"
                                : currentLanguage === "en"
                                  ? "Hidden by provider"
                                  : "Teenusepakkuja poolt peidetud"}
                            </div>
                          );
                        case "provider_restriction":
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Недоступно другим п��ставщикам"
                                : currentLanguage === "en"
                                  ? "Not available to other providers"
                                  : "Pole kättesaadav teistele teenusepakkujatele"}
                            </div>
                          );
                        case "subscription_required":
                          return (
                            <div className="text-sm">
                              <button
                                onClick={() =>
                                  openSubscriptionModal("view-profile")
                                }
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                {currentLanguage === "ru"
                                  ? "Подписка требуется для просмотра"
                                  : currentLanguage === "en"
                                    ? "Subscription required to view"
                                    : "Vaatamiseks on vajalik tellimus"}
                              </button>
                            </div>
                          );
                        default:
                          return (
                            <div className="text-sm text-gray-500">
                              {currentLanguage === "ru"
                                ? "Войдите для просмотра"
                                : currentLanguage === "en"
                                  ? "Sign in to view"
                                  : "Vaatamiseks logige sisse"}
                            </div>
                          );
                      }
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(() => {
              // Hide social links from other providers
              if (user?.accountType === "provider" && !isOwnProfile) {
                return null;
              }

              // Show social links if:
              // - Owner viewing their own profile (editing)
              // - Customer with subscription viewing
              const shouldShowSocialLinks =
                isOwnProfile ||
                (user?.accountType === "customer" && isClientSubscribed);

              if (!shouldShowSocialLinks) {
                return null;
              }

              return (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentLanguage === "ru"
                      ? "С���циальные ��ети"
                      : currentLanguage === "en"
                        ? "Social Links"
                        : "Sotsiaalmeedia lingid"}
                  </h3>
                  <div className="space-y-3">
                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {currentLanguage === "ru"
                          ? "URL веб-сайта"
                          : currentLanguage === "en"
                            ? "Website URL"
                            : "Veebilehe URL"}
                      </label>
                      {isEditMode ? (
                        <input
                          type="url"
                          value=""
                          onChange={(e) => {
                            // setEditData({ ...editData, website: e.target.value });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      ) : (
                        <div className="text-sm">
                          {false ? (
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              #
                            </a>
                          ) : (
                            <span className="text-gray-500">
                              {currentLanguage === "ru"
                                ? "Не указано"
                                : currentLanguage === "en"
                                  ? "Not provided"
                                  : "Pole esitatud"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {currentLanguage === "ru"
                          ? "LinkedIn URL"
                          : currentLanguage === "en"
                            ? "LinkedIn URL"
                            : "LinkedIn URL"}
                      </label>
                      {isEditMode ? (
                        <input
                          type="url"
                          value=""
                          onChange={(e) => {
                            // setEditData({ ...editData, linkedin: e.target.value });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      ) : (
                        <div className="text-sm">
                          {false ? (
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              #
                            </a>
                          ) : (
                            <span className="text-gray-500">
                              {currentLanguage === "ru"
                                ? "Не указано"
                                : currentLanguage === "en"
                                  ? "Not provided"
                                  : "Pole esitatud"}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Delete Account - Danger Zone - REMOVED */}
            {/* Danger Zone should only appear in Settings dashboard, not in profile view */}

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.providerProfile.recentReviews}
              </h3>
              <div className="space-y-4">
                {provider.recentReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {review.client}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Gate Modal */}
      <GateModal
        isOpen={messageGate.isGateOpen}
        onClose={messageGate.handleGateClose}
        onSuccess={messageGate.handleGateSuccess}
        actionName="Message Provider"
      />
    </div>
  );
}
