import React, { useState, useEffect } from "react";
import {
  LanguageSkill,
  Service,
  Consultation,
  PortfolioItem,
  ProviderProfile,
} from "../Types";

import { DeleteAccountModal } from "../components/modals/DeleteAccountModal";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import CustomCard from "../components/forms/Card";
import PasswordChangeForm from "../components/profile/PasswordChangeForm";
import PrivacySettings from "../components/profile/PrivacySettings";
import DangerZone from "../components/profile/DangerZone";
import BasicInformationSection from "../components/profile/BasicInformationSection";
import ContactInformationSection from "../components/profile/ContactInformationSection";

import ServiceConsultationCard from "../components/services/ServiceConsultationCard";
import LanguageAutocomplete from "../components/forms/LanguageAutocomplete";
import SkillsAutocomplete from "../components/forms/SkillsAutocomplete";
import CategorySelector from "../components/forms/CategorySelector";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import ServiceEditModal from "../components/services/ServiceEditModal";
import ConsultationEditModal from "../components/services/ConsultationEditModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import SimpleAvailabilityToggle from "../components/dashboard/SimpleAvailabilityToggle";
import PhotoUpload from "../components/profile/PhotoUpload";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";
import { ProviderProvider, useProvider } from "../lib/ProviderContext";
import { useVerificationRestrictions } from "../hooks/useVerificationRestrictions";
import { EmailVerificationAlert } from "../components/authentication/EmailVerificationAlert";
import {
  User,
  Star,
  Calendar,
  MessageCircle,
  Plus,
  Edit,
  Video,
  MapPin,
  Globe,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  Save,
  X,
  Phone,
  Briefcase,
  Lock,
} from "lucide-react";

import { getLocalizedLanguageName } from "../data/languages";

function ModernProviderDashboardContent() {
  const { currentLanguage, t } = useLanguage();
  const {
    user,
    updateEmail,
    setCurrentProfilePhoto,
    refreshUserData,
    resendVerificationEmail,
  } = useAuth();
  const { provider, stats, updateProviderStatus, isLoading } = useProvider();
  const {
    canAddServices,
    canAddConsultations,
    isRestricted,
    restrictionMessage,
  } = useVerificationRestrictions();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [editableProvider, setEditableProvider] = useState<ProviderProfile>(
    provider ||
      ({
        name: "",
        headline: "",
        bio: "",
        photo: "",
        location: "",
        rating: 0,
        reviewCount: 0,
        memberSince: "",
        status: "offline",
        availability: { state: "offline" },
        skills: [],
        languageSkills: [],
      } as ProviderProfile),
  );
  const [originalProvider, setOriginalProvider] =
    useState<ProviderProfile | null>(null);

  // Touch/swipe state for mobile tab navigation
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showSocials, setShowSocials] = useState(true);

  // Email verification status based on actual user data
  const emailVerificationStatus = user?.isEmailVerified
    ? "verified"
    : "unverified";
  const [editableEmail, setEditableEmail] = useState(user?.email || "");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  // Check if email has changed from the original
  const hasEmailChanged = editableEmail !== user?.email;

  // Profile completion check
  const checkProfileCompletion = () => {
    const requiredFields = [
      editableProvider.skills && editableProvider.skills.length > 0,
      editableProvider.primaryCategory ||
        (editableProvider.secondaryCategories &&
          editableProvider.secondaryCategories.length > 0),
      editableProvider.headline,
      editableProvider.bio,
      editableProvider.languageSkills &&
        editableProvider.languageSkills.length > 0,
    ];

    return requiredFields.every((field) => field);
  };

  const isProfileComplete = checkProfileCompletion();

  // Swipe handling for mobile tab navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    const availableTabs = tabs.filter((tab) => {
      const isLocked =
        !isProfileComplete &&
        [
          "services",
          "portfolio",
          "bookings",
          "tasks",
          "feedback",
          "settings",
        ].includes(tab.id);
      return !isLocked;
    });

    const currentIndex = availableTabs.findIndex((tab) => tab.id === activeTab);

    if (isLeftSwipe && currentIndex < availableTabs.length - 1) {
      // Swipe left - go to next tab
      setActiveTab(availableTabs[currentIndex + 1].id);
    } else if (isRightSwipe && currentIndex > 0) {
      // Swipe right - go to previous tab
      setActiveTab(availableTabs[currentIndex - 1].id);
    }
  };

  // Handle email update
  const handleUpdateEmail = async () => {
    if (!hasEmailChanged || !editableEmail) return;

    setIsUpdatingEmail(true);
    try {
      await updateEmail(editableEmail);
      toast({
        title:
          currentLanguage === "ru"
            ? "Email обновлён"
            : currentLanguage === "en"
              ? "Email Updated"
              : "E-mail uuendatud",
        description:
          currentLanguage === "ru"
            ? "На новый email отправлена ссылка для подтверждения."
            : currentLanguage === "en"
              ? "A verification link has been sent to your new email."
              : "Uuele e-mailile on saadetud kinnituslink.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка"
            : currentLanguage === "en"
              ? "Error"
              : "Viga",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };
  const [requiresProfileCompletion, setRequiresProfileCompletion] =
    useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  // Modal states
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingConsultation, setEditingConsultation] =
    useState<Consultation | null>(null);
  const [deleteItem, setDeleteItem] = useState<{
    type: "service" | "consultation";
    id: string;
    title: string;
  } | null>(null);

  // Update editable provider when provider changes
  useEffect(() => {
    if (provider) {
      setEditableProvider(provider);
    }
    if (user?.email) {
      setEditableEmail(user.email);
    }
  }, [provider, user?.email]);

  // Save current provider profile to localStorage automatically for role switching
  useEffect(() => {
    if (user && editableProvider.name && editableProvider.email) {
      localStorage.setItem(
        "provider_profile",
        JSON.stringify({
          firstName: editableProvider.firstName || "",
          lastName: editableProvider.lastName || "",
          name: editableProvider.name,
          email: editableProvider.email,
          company: editableProvider.company || "",
          phone: editableProvider.phone || "",
          location: editableProvider.location || "",
          website: editableProvider.website || "",
          linkedin: editableProvider.linkedin || "",
          github: editableProvider.github || "",
          bio: editableProvider.bio || "",
          languageSkills: editableProvider.languageSkills || [],
          headline: editableProvider.headline || "",
        }),
      );
    }
  }, [editableProvider, user]);

  // Services state - start with empty array, load from API
  const [services, setServices] = useState<Service[]>([]);

  // Consultations state - start with empty array, load from API
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  // Portfolio state - start with empty array, load from API
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const handleEditProfile = () => {
    if (isRestricted) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Требуется подтверждение"
            : currentLanguage === "en"
              ? "Verification Required"
              : "Vajalik kinnitamine",
        description: restrictionMessage,
        variant: "destructive",
      });
      return;
    }
    setOriginalProvider({ ...editableProvider });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save provider profile to localStorage for role switching prefill
      localStorage.setItem(
        "provider_profile",
        JSON.stringify({
          name: editableProvider.name,
          email: editableProvider.email || editableEmail,
          phone: editableProvider.phone,
          location: editableProvider.location,
          website: editableProvider.website,
          linkedin: editableProvider.linkedin,
          bio: editableProvider.bio,
          skills: editableProvider.skills,
          languageSkills: editableProvider.languageSkills,
          headline: editableProvider.headline,
          primaryCategory: editableProvider.primaryCategory,
          secondaryCategories: editableProvider.secondaryCategories || [],
        }),
      );

      setIsEditingProfile(false);
      setOriginalProvider(null);

      toast({
        title:
          currentLanguage === "ru"
            ? "Профиль обновлён!"
            : currentLanguage === "en"
              ? "Profile updated successfully!"
              : "Profiil edukalt uuendatud!",
        description:
          currentLanguage === "ru"
            ? "Добро пожаловать обратно!"
            : currentLanguage === "en"
              ? "Welcome back!"
              : "Tere tulemast tagasi!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка сохранения"
            : currentLanguage === "en"
              ? "Save failed"
              : "Salvestamine ebaõnnestus",
        variant: "destructive",
      });
    }
  };

  const handleCancelEditProfile = () => {
    if (originalProvider) {
      setEditableProvider(originalProvider);
    }
    setIsEditingProfile(false);
    setOriginalProvider(null);
  };

  const handleDeleteAccount = () => {
    setIsDeleteAccountOpen(true);
  };

  // Service management with modals
  const handleAddService = () => {
    if (!canAddServices) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Требуется подтверждение"
            : currentLanguage === "en"
              ? "Verification Required"
              : "Vajalik kinnitamine",
        description: restrictionMessage,
        variant: "destructive",
      });
      return;
    }
    setEditingService(null);
    setServiceModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceModalOpen(true);
  };

  const handleSaveService = (service: Service) => {
    if (editingService?.id) {
      setServices(
        services.map((s) => (s.id === editingService.id ? service : s)),
      );
    } else {
      setServices([...services, { ...service, id: Date.now().toString() }]);
    }

    toast({
      title:
        currentLanguage === "ru"
          ? "Услуга сохранена!"
          : currentLanguage === "en"
            ? "Service saved!"
            : "Teenus salvestatud!",
      variant: "default",
    });

    setServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    toast({
      title:
        currentLanguage === "ru"
          ? "Услуга удалёна!"
          : currentLanguage === "en"
            ? "Service deleted!"
            : "Teenus kustutatud!",
      variant: "default",
    });
  };

  // Consultation management with modals
  const handleAddConsultation = () => {
    if (!canAddConsultations) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Требуется подтверждение"
            : currentLanguage === "en"
              ? "Verification Required"
              : "Vajalik kinnitamine",
        description: restrictionMessage,
        variant: "destructive",
      });
      return;
    }
    setEditingConsultation(null);
    setConsultationModalOpen(true);
  };

  const handleEditConsultation = (consultation: Consultation) => {
    setEditingConsultation(consultation);
    setConsultationModalOpen(true);
  };

  const handleSaveConsultation = (consultation: Consultation) => {
    if (editingConsultation?.id) {
      setConsultations(
        consultations.map((c) =>
          c.id === editingConsultation.id ? consultation : c,
        ),
      );
    } else {
      setConsultations([
        ...consultations,
        { ...consultation, id: Date.now().toString() },
      ]);
    }

    toast({
      title:
        currentLanguage === "ru"
          ? "Консультация сохранена!"
          : currentLanguage === "en"
            ? "Consultation saved!"
            : "Konsultatsioon salvestatud!",
      variant: "default",
    });

    setConsultationModalOpen(false);
    setEditingConsultation(null);
  };

  const handleDeleteConsultation = (id: string) => {
    setConsultations(consultations.filter((c) => c.id !== id));
    toast({
      title:
        currentLanguage === "ru"
          ? "Консультация удёлена!"
          : currentLanguage === "en"
            ? "Consultation deleted!"
            : "Konsultatsioon kustutatud!",
      variant: "default",
    });
  };

  // Portfolio management
  const handleAddPortfolio = () => {
    const newPortfolio: PortfolioItem = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      image:
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=400&h=300&fit=crop",
      link: "",
    };
    setPortfolio([...portfolio, newPortfolio]);
  };

  const handleDeletePortfolio = (id: string) => {
    setPortfolio(portfolio.filter((p) => p.id !== id));
    toast({
      title:
        currentLanguage === "ru"
          ? "Проект удален!"
          : currentLanguage === "en"
            ? "Project deleted!"
            : "Projekt kustutatud!",
      variant: "default",
    });
  };

  // Language and Skills handlers
  const handleLanguagesChange = (languages: LanguageSkill[]) => {
    setEditableProvider({ ...editableProvider, languageSkills: languages });
  };

  const handleSkillsChange = (skills: string[]) => {
    setEditableProvider({ ...editableProvider, skills: skills });
  };

  // Privacy settings handlers
  const handlePhoneNumberVisibilityChange = (checked: boolean) => {
    setShowPhoneNumber(checked);
    setTimeout(() => {
      toast({
        title:
          currentLanguage === "ru"
            ? "Настройки приватности обновлены"
            : currentLanguage === "en"
              ? "Privacy settings updated"
              : "Privaatsuse seaded uuendatud",
        description: checked
          ? currentLanguage === "ru"
            ? "Номер телефона теперь виден в профиле."
            : currentLanguage === "en"
              ? "Phone number is now visible in your profile."
              : "Telefoninumber on nüüd teie profiilis nähtav."
          : currentLanguage === "ru"
            ? "Номер телефона скрыт из профиля."
            : currentLanguage === "en"
              ? "Phone number is now hidden from your profile."
              : "Telefoninumber on nüüd teie profiilist peidetud.",
        variant: "default",
      });
    }, 100);
  };

  const handleEmailVisibilityChange = (checked: boolean) => {
    setShowEmail(checked);
    setTimeout(() => {
      toast({
        title:
          currentLanguage === "ru"
            ? "Настройки приватности обновлены"
            : currentLanguage === "en"
              ? "Privacy settings updated"
              : "Privaatsuse seaded uuendatud",
        description: checked
          ? currentLanguage === "ru"
            ? "Email адрес теперь виден в профиле."
            : currentLanguage === "en"
              ? "Email address is now visible in your profile."
              : "E-posti aadress on nüüd teie profiilis nähtav."
          : currentLanguage === "ru"
            ? "Email адрес скрыт из профиля."
            : currentLanguage === "en"
              ? "Email address is now hidden from your profile."
              : "E-posti aadress on nüüd teie profiilist peidetud.",
        variant: "default",
      });
    }, 100);
  };

  const handleSocialsVisibilityChange = (checked: boolean) => {
    setShowSocials(checked);
    setTimeout(() => {
      toast({
        title:
          currentLanguage === "ru"
            ? "Настройки приватности обновлены"
            : currentLanguage === "en"
              ? "Privacy settings updated"
              : "Privaatsuse seaded uuendatud",
        description: checked
          ? currentLanguage === "ru"
            ? "Социальные сети теперь видны в профиле."
            : currentLanguage === "en"
              ? "Social links are now visible in your profile."
              : "Sotsiaalmeedia lingid on nüüd teie profiilis nähtavad."
          : currentLanguage === "ru"
            ? "Социальные сети скрыты из профиля."
            : currentLanguage === "en"
              ? "Social links are now hidden from your profile."
              : "Sotsiaalmeedia lingid on nüüd teie profiilist peidetud.",
        variant: "default",
      });
    }, 100);
  };

  // Delete confirmation modal handler
  const handleDeleteConfirmation = (
    type: "service" | "consultation" | "portfolio",
    id: string,
    title: string,
  ) => {
    setDeleteItem({ type: type as "service" | "consultation", id, title });
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteItem) return;

    const { type, id } = deleteItem;

    switch (type) {
      case "service":
        handleDeleteService(id);
        break;
      case "consultation":
        handleDeleteConsultation(id);
        break;
    }

    setDeleteItem(null);
    setDeleteModalOpen(false);
  };

  if (isLoading || !provider || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading provider dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: t.providerDashboard.overview },
    {
      id: "services",
      label:
        currentLanguage === "ru"
          ? "Услуги и консультации"
          : currentLanguage === "en"
            ? "Services & Consultations"
            : "Teenused ja konsultatsioonid",
    },
    { id: "portfolio", label: t.providerDashboard.portfolio },
    { id: "bookings", label: t.providerDashboard.bookings },
    {
      id: "tasks",
      label:
        currentLanguage === "ru"
          ? "Задачи"
          : currentLanguage === "en"
            ? "Tasks"
            : "Ülesanded",
    },
    { id: "feedback", label: t.providerDashboard.feedback },
    { id: "settings", label: t.providerDashboard.settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${t.providerDashboard.overview} | QuickHire`}
        description="Modern provider dashboard for managing tasks, consultations, and profile"
        url={`https://quickhire.ee/${currentLanguage}/dashboard/provider`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
        {/* Email Verification Alert */}
        {user && isRestricted && (
          <EmailVerificationAlert
            emailVerified={user.isEmailVerified}
            email={user.email}
            className="mb-6"
            showActions={true}
          />
        )}

        {/* Profile Completion Alert */}
        {!isProfileComplete && !isRestricted && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-amber-800 mb-1">
                  {currentLanguage === "ru"
                    ? "Завершите настройку профиля"
                    : currentLanguage === "en"
                      ? "Complete Your Profile Setup"
                      : "Lõpetage oma profiili seadistus"}
                </h3>
                <p className="text-xs sm:text-sm text-amber-700 mb-2 sm:mb-3">
                  {currentLanguage === "ru"
                    ? "Заполните обязательные поля, чтобы разблокировать все функции"
                    : currentLanguage === "en"
                      ? "Fill in required fields to unlock all features"
                      : "Täitke kohustuslikud väljad kõigi funktsioonide avamiseks"}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 text-xs">
                  {(!editableProvider.skills ||
                    editableProvider.skills.length === 0) && (
                    <span className="bg-white px-2 py-1 rounded text-amber-800 border border-amber-300">
                      {currentLanguage === "ru"
                        ? "Навыки"
                        : currentLanguage === "en"
                          ? "Skills"
                          : "Oskused"}
                    </span>
                  )}
                  {!editableProvider.primaryCategory &&
                    (!editableProvider.secondaryCategories ||
                      editableProvider.secondaryCategories.length === 0) && (
                      <span className="bg-white px-2 py-1 rounded text-amber-800 border border-amber-300">
                        {currentLanguage === "ru"
                          ? "Категории"
                          : currentLanguage === "en"
                            ? "Categories"
                            : "Kategooriad"}
                      </span>
                    )}
                  {!editableProvider.headline && (
                    <span className="bg-white px-2 py-1 rounded text-amber-800 border border-amber-300">
                      {currentLanguage === "ru"
                        ? "Профессия"
                        : currentLanguage === "en"
                          ? "Title"
                          : "Tiitel"}
                    </span>
                  )}
                  {!editableProvider.bio && (
                    <span className="bg-white px-2 py-1 rounded text-amber-800 border border-amber-300">
                      {currentLanguage === "ru"
                        ? "Биография"
                        : currentLanguage === "en"
                          ? "Bio"
                          : "Bio"}
                    </span>
                  )}
                  {(!editableProvider.languageSkills ||
                    editableProvider.languageSkills.length === 0) && (
                    <span className="bg-white px-2 py-1 rounded text-amber-800 border border-amber-300">
                      {currentLanguage === "ru"
                        ? "Языки"
                        : currentLanguage === "en"
                          ? "Languages"
                          : "Keeled"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Provider Profile Header - New Organized Layout */}
        <CustomCard border shadow="sm" className="mb-3 sm:mb-6">
          <div className="p-3 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {currentLanguage === "ru"
                  ? "Профиль"
                  : currentLanguage === "en"
                    ? "Profile"
                    : "Profiil"}
              </h2>
              {!isEditingProfile && (
                <button
                  onClick={handleEditProfile}
                  aria-disabled={isRestricted}
                  className={`flex items-center font-medium text-sm transition-colors px-2 sm:px-3 py-2 rounded-lg ${
                    isRestricted
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {isRestricted ? (
                    <Lock className="h-4 w-4 mr-1 sm:mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 mr-1 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">
                    {currentLanguage === "ru"
                      ? "Редактировать"
                      : currentLanguage === "en"
                        ? "Edit"
                        : "Muuda"}
                  </span>
                  <span className="sm:hidden">
                    {currentLanguage === "ru"
                      ? "Ред."
                      : currentLanguage === "en"
                        ? "Edit"
                        : "Muuda"}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Main Profile Info */}
              <div>
                {isEditingProfile ? (
                  <div className="space-y-8">
                    {/* Basic Information Section */}
                    <BasicInformationSection
                      currentPhoto={
                        user?.profileImage ||
                        editableProvider.photo ||
                        provider.photo
                      }
                      onPhotoChange={(photoData) => {
                        setEditableProvider({
                          ...editableProvider,
                          photo: photoData,
                        });
                        setCurrentProfilePhoto(photoData);
                      }}
                      firstName={
                        editableProvider.firstName ||
                        editableProvider.name?.split(" ")[0] ||
                        ""
                      }
                      lastName={
                        editableProvider.lastName ||
                        editableProvider.name?.split(" ").slice(1).join(" ") ||
                        ""
                      }
                      company={editableProvider.company || ""}
                      onFirstNameChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          firstName: value,
                          name: `${value} ${editableProvider.lastName || editableProvider.name?.split(" ").slice(1).join(" ") || ""}`.trim(),
                        })
                      }
                      onLastNameChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          lastName: value,
                          name: `${editableProvider.firstName || editableProvider.name?.split(" ")[0] || ""} ${value}`.trim(),
                        })
                      }
                      onCompanyChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          company: value,
                        })
                      }
                      email={editableEmail}
                      onEmailChange={setEditableEmail}
                      isEmailVerified={user?.isEmailVerified}
                      hasEmailChanged={hasEmailChanged}
                      isUpdatingEmail={isUpdatingEmail}
                      onUpdateEmail={handleUpdateEmail}
                      onResendVerification={async () => {
                        try {
                          await resendVerificationEmail();
                          toast({
                            title:
                              currentLanguage === "ru"
                                ? "Подтверждение отправлено"
                                : currentLanguage === "en"
                                  ? "Verification sent"
                                  : "Kinnitus saadetud",
                            description:
                              currentLanguage === "ru"
                                ? "Проверьте ваш email для подтверждения"
                                : currentLanguage === "en"
                                  ? "Check your email for verification"
                                  : "Kontrollige oma e-maili kinnitamiseks",
                            variant: "default",
                          });
                        } catch (error) {
                          toast({
                            title:
                              currentLanguage === "ru"
                                ? "Ошибка"
                                : currentLanguage === "en"
                                  ? "Error"
                                  : "Viga",
                            description:
                              currentLanguage === "ru"
                                ? "Не удалось отправить подтверждение"
                                : currentLanguage === "en"
                                  ? "Failed to send verification"
                                  : "Kinnituse saatmine ebaõnnestus",
                            variant: "destructive",
                          });
                        }
                      }}
                      bio={editableProvider.bio || ""}
                      languages={editableProvider.languageSkills || []}
                      onBioChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          bio: value,
                        })
                      }
                      onLanguagesChange={handleLanguagesChange}
                      headline={editableProvider.headline || ""}
                      onHeadlineChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          headline: value,
                        })
                      }
                      location={editableProvider.location || ""}
                      onLocationChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          location: value,
                        })
                      }
                      variant="provider"
                    />

                    {/* Contact Information Section */}
                    <ContactInformationSection
                      phone={editableProvider.phone || ""}
                      location={editableProvider.location || ""}
                      website={editableProvider.website || ""}
                      linkedin={editableProvider.linkedin || ""}
                      github={editableProvider.github || ""}
                      onPhoneChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          phone: value,
                        })
                      }
                      onLocationChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          location: value,
                        })
                      }
                      onWebsiteChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          website: value,
                        })
                      }
                      onLinkedinChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          linkedin: value,
                        })
                      }
                      onGithubChange={(value) =>
                        setEditableProvider({
                          ...editableProvider,
                          github: value,
                        })
                      }
                      variant="provider"
                    />

                    {/* Categories & Skills Section - moved after Contact */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100">
                      <div className="flex items-center mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {currentLanguage === "ru"
                            ? "Категории и навыки"
                            : currentLanguage === "en"
                              ? "Categories & Skills"
                              : "Kategooriad ja oskused"}
                        </h3>
                      </div>

                      <CategorySelector
                        primaryCategory={editableProvider.primaryCategory || ""}
                        secondaryCategories={
                          editableProvider.secondaryCategories || []
                        }
                        onPrimaryCategoryChange={(category) =>
                          setEditableProvider({
                            ...editableProvider,
                            primaryCategory: category,
                          })
                        }
                        onSecondaryCategoriesChange={(categories) =>
                          setEditableProvider({
                            ...editableProvider,
                            secondaryCategories: categories,
                          })
                        }
                        skills={editableProvider.skills || []}
                        className="mb-6"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {currentLanguage === "ru"
                            ? "Навыки"
                            : currentLanguage === "en"
                              ? "Skills"
                              : "Oskused"}
                        </label>
                        <SkillsAutocomplete
                          value={editableProvider.skills || []}
                          onChange={handleSkillsChange}
                          placeholder={
                            currentLanguage === "ru"
                              ? "Поиск и добавление навыков..."
                              : currentLanguage === "en"
                                ? "Search and add skills..."
                                : "Otsi ja lisa oskuseid..."
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* View Mode - Main Info */}
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                      <PhotoUpload
                        currentPhoto={
                          user?.profileImage ||
                          editableProvider.photo ||
                          provider.photo
                        }
                        onPhotoChange={() => {}} // Read-only in view mode
                        size="md"
                        showUploadButton={false}
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center space-x-3 mb-2">
                          <h1 className="text-2xl font-bold text-gray-900">
                            {editableProvider.name || provider.name}
                          </h1>
                          <SimpleAvailabilityToggle
                            currentStatus={
                              provider.status === "available" ||
                              provider.status === "busy"
                                ? provider.status
                                : "available"
                            }
                            onStatusChange={(status) =>
                              updateProviderStatus(status)
                            }
                            size="sm"
                            disabled={isRestricted}
                          />
                        </div>

                        {(editableProvider.headline || provider.headline) && (
                          <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-3">
                            {editableProvider.headline || provider.headline}
                          </p>
                        )}

                        {(editableProvider.company ||
                          (provider as any).company) && (
                          <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 font-medium">
                            {editableProvider.company ||
                              (provider as any).company}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                          {(editableProvider.location || provider.location) && (
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              <span className="truncate max-w-[120px] sm:max-w-none">
                                {editableProvider.location || provider.location}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-400 fill-current" />
                            {provider.rating} ({provider.reviewCount} reviews)
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">
                              {t.providerDashboard.memberSince}{" "}
                            </span>
                            {provider.memberSince}
                          </div>
                        </div>

                        {(editableProvider.bio || provider.bio) && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {editableProvider.bio || provider.bio}
                          </p>
                        )}

                        {/* Languages Display in View Mode */}
                        {((editableProvider.languageSkills &&
                          editableProvider.languageSkills.length > 0) ||
                          (provider.languageSkills &&
                            provider.languageSkills.length > 0)) && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                              {currentLanguage === "ru"
                                ? "Владею языками"
                                : currentLanguage === "en"
                                  ? "Languages Spoken"
                                  : "Valdab keeli"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(
                                editableProvider.languageSkills ||
                                provider.languageSkills ||
                                []
                              ).map((langSkill, index) => {
                                const getLevelColor = (level: string) => {
                                  switch (level) {
                                    case "native":
                                      return "bg-green-100 text-green-800 border-green-200";
                                    case "fluent":
                                      return "bg-blue-100 text-blue-800 border-blue-200";
                                    case "conversational":
                                      return "bg-gray-100 text-gray-800 border-gray-200";
                                    default:
                                      return "bg-gray-100 text-gray-800 border-gray-200";
                                  }
                                };

                                const getLevelLabel = (level: string) => {
                                  switch (level) {
                                    case "native":
                                      return currentLanguage === "ru"
                                        ? "Родной"
                                        : currentLanguage === "en"
                                          ? "Native"
                                          : "Emakeel";
                                    case "fluent":
                                      return currentLanguage === "ru"
                                        ? "Свободно"
                                        : currentLanguage === "en"
                                          ? "Fluent"
                                          : "Sujuv";
                                    case "conversational":
                                      return currentLanguage === "ru"
                                        ? "Разговорный"
                                        : currentLanguage === "en"
                                          ? "Conversational"
                                          : "Vestlustase";
                                    default:
                                      return level;
                                  }
                                };

                                // Handle both old string format and new LanguageSkill format
                                if (typeof langSkill === "string") {
                                  return (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                                    >
                                      {langSkill}
                                    </span>
                                  );
                                }

                                // Get proper language name based on current language
                                const languageCode =
                                  langSkill.code || langSkill.name;
                                const languageName = languageCode
                                  ? getLocalizedLanguageName(
                                      languageCode,
                                      currentLanguage as "et" | "en" | "ru",
                                    )
                                  : langSkill.label ||
                                    langSkill.name ||
                                    "Unknown Language";
                                const languageLevel =
                                  langSkill.level || "conversational";

                                return (
                                  <span
                                    key={langSkill.code || index}
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(languageLevel)}`}
                                  >
                                    <span className="font-medium">
                                      {languageName}
                                    </span>
                                    <span className="text-xs opacity-75 ml-1">
                                      ({getLevelLabel(languageLevel)})
                                    </span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact Information in View Mode */}
                    {(editableProvider.phone ||
                      editableProvider.website ||
                      editableProvider.linkedin ||
                      editableProvider.github) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                          {currentLanguage === "ru"
                            ? "Контакты"
                            : currentLanguage === "en"
                              ? "Contact"
                              : "Kontakt"}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                          {editableProvider.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              <span>{editableProvider.phone}</span>
                            </div>
                          )}
                          {editableProvider.website && (
                            <a
                              href={editableProvider.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              <span>Website</span>
                            </a>
                          )}
                          {editableProvider.linkedin && (
                            <a
                              href={editableProvider.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <Linkedin className="h-4 w-4 mr-2" />
                              <span>LinkedIn</span>
                            </a>
                          )}
                          {editableProvider.github && (
                            <a
                              href={editableProvider.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              <span>GitHub</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons for Edit Mode */}
                {isEditingProfile && (
                  <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 mt-8 border-t border-gray-200">
                    <button
                      onClick={handleCancelEditProfile}
                      className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      {currentLanguage === "ru"
                        ? "Отмена"
                        : currentLanguage === "en"
                          ? "Cancel"
                          : "Tühista"}
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center shadow-lg"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {currentLanguage === "ru"
                        ? "Сохранить изменения"
                        : currentLanguage === "en"
                          ? "Save Changes"
                          : "Salvesta muudatused"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CustomCard>

        {/* Tab Navigation */}
        <CustomCard border shadow="sm" className="mb-3 sm:mb-6 lg:mb-8">
          <div className="border-b border-gray-200">
            <nav
              className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-6 relative"
              aria-label="Tabs"
            >
              {/* Mobile Swipe Indicator */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 sm:hidden text-gray-400 pointer-events-none">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              {tabs.map((tab) => {
                const isLockedProfile =
                  !isProfileComplete &&
                  [
                    "services",
                    "portfolio",
                    "bookings",
                    "tasks",
                    "feedback",
                    "settings",
                  ].includes(tab.id);
                const isLockedEmail = isRestricted;
                const isLocked = isLockedEmail || isLockedProfile;

                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (isLockedEmail) {
                        toast({
                          title:
                            currentLanguage === "ru"
                              ? "Требуется подтверждение"
                              : currentLanguage === "en"
                                ? "Verification Required"
                                : "Vajalik kinnitamine",
                          description: restrictionMessage,
                          variant: "destructive",
                        });
                        return;
                      }
                      if (isLockedProfile) {
                        toast({
                          title:
                            currentLanguage === "ru"
                              ? "Завершите профиль"
                              : currentLanguage === "en"
                                ? "Complete Your Profile"
                                : "Lõpetage oma profiil",
                          description:
                            currentLanguage === "ru"
                              ? "Заполните навыки, категории, профессию, биографию и языки, чтобы разблокировать все функции."
                              : currentLanguage === "en"
                                ? "Fill in skills, categories, professional title, bio, and languages to unlock all features."
                                : "Täitke oskused, kategooriad, kutse, elulugu ja keeled, et avada kõik funktsioonid.",
                          variant: "destructive",
                        });
                        return;
                      }

                      const currentScrollY = window.scrollY;
                      setActiveTab(tab.id);
                      setTimeout(() => {
                        window.scrollTo(0, currentScrollY);
                      }, 0);
                    }}
                    className={`py-3 sm:py-3 lg:py-4 px-3 sm:px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 min-w-0 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : isLocked
                          ? "border-transparent text-gray-400 cursor-not-allowed opacity-60"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                    {isLocked && (
                      <span className="ml-1 text-xs opacity-60">🔒</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div
            className={`p-3 sm:p-6 tab-content-swipeable transition-all duration-200 ${isSwiping ? "scale-98 opacity-90" : ""}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {activeTab === "overview" && (
              <div>
                {/* Welcome Message */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {`${t.providerDashboard.welcomeBack || "Welcome back"}, ${provider.name?.split(" ")[0] || provider.name}!`}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {provider.bio ||
                      (currentLanguage === "ru"
                        ? "Управляйте своими услугами и проектами"
                        : currentLanguage === "en"
                          ? "Manage your services and projects"
                          : "Hallake oma teenuseid ja projekte")}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-blue-600 truncate">
                          {currentLanguage === "ru"
                            ? "Задач выполнено"
                            : currentLanguage === "en"
                              ? "Total tasks completed"
                              : "Ülesandeid lõpetatud"}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-900">
                          {stats.totalTasks}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 sm:p-6">
                    <div className="flex items-center">
                      <Video className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-green-600 truncate">
                          {currentLanguage === "ru"
                            ? "Консультаций проведено"
                            : currentLanguage === "en"
                              ? "Consultations delivered"
                              : "Konsultatsioone tehtud"}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-green-900">
                          {stats.consultations}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 sm:p-6">
                    <div className="flex items-center">
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-yellow-600 truncate">
                          {currentLanguage === "ru"
                            ? "Средний рейтинг"
                            : currentLanguage === "en"
                              ? "Average rating"
                              : "Keskmine hinnang"}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-yellow-900">
                          {stats.rating}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 sm:p-6">
                    <div className="flex items-center">
                      <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-purple-600 truncate">
                          {currentLanguage === "ru"
                            ? "Всего отзывов"
                            : currentLanguage === "en"
                              ? "Total reviews"
                              : "Kokku arvustusi"}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-900">
                          {stats.reviews}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.providerDashboard.tasksInProgress}
                      </h3>
                      <span className="text-2xl font-bold text-blue-600">
                        {stats.tasksInProgress}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.providerDashboard.upcomingConsultations}
                      </h3>
                      <span className="text-2xl font-bold text-green-600">
                        {stats.upcomingConsultations}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t.providerDashboard.pendingProposals}
                      </h3>
                      <span className="text-2xl font-bold text-orange-600">
                        {stats.pendingProposals}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-8">
                {/* Services Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentLanguage === "ru"
                        ? "Услуги"
                        : currentLanguage === "en"
                          ? "Services"
                          : "Teenused"}
                    </h2>
                    <button
                      onClick={handleAddService}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {currentLanguage === "ru"
                        ? "Добавить усл��гу"
                        : currentLanguage === "en"
                          ? "Add Service"
                          : "Lisa teenus"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {services.map((service) => (
                      <ServiceConsultationCard
                        key={service.id}
                        item={service}
                        type="service"
                        onEdit={handleEditService}
                        onDelete={(id) =>
                          handleDeleteConfirmation("service", id, service.title)
                        }
                        isEditing={false}
                      />
                    ))}
                  </div>
                </div>

                {/* Consultations Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentLanguage === "ru"
                        ? "Консультации"
                        : currentLanguage === "en"
                          ? "Consultations"
                          : "Konsultatsioonid"}
                    </h2>
                    <button
                      onClick={handleAddConsultation}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {currentLanguage === "ru"
                        ? "Доб��вить консультацию"
                        : currentLanguage === "en"
                          ? "Add Consultation"
                          : "Lisa konsultatsioon"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {consultations.map((consultation) => (
                      <ServiceConsultationCard
                        key={consultation.id}
                        item={consultation}
                        type="consultation"
                        onEdit={handleEditConsultation}
                        onDelete={(id) =>
                          handleDeleteConfirmation(
                            "consultation",
                            id,
                            consultation.title,
                          )
                        }
                        isEditing={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t.providerDashboard.portfolio}
                  </h2>
                  <button
                    onClick={handleAddPortfolio}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {currentLanguage === "ru"
                      ? "Добавить проект"
                      : currentLanguage === "en"
                        ? "Add Project"
                        : "Lisa projekt"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      onEdit={() => {}}
                      onDelete={(id) =>
                        handleDeleteConfirmation("portfolio", id, item.title)
                      }
                      isEditing={false}
                      onSave={() => {}}
                      onCancel={() => {}}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-8">
                {/* Account Settings */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentLanguage === "ru"
                      ? "Настройки аккаунта"
                      : currentLanguage === "en"
                        ? "Account Settings"
                        : "Konto seaded"}
                  </h2>

                  {/* Change Password */}
                  <PasswordChangeForm
                    isPasswordSet={user?.isPasswordSet || false}
                    onPasswordChanged={() => refreshUserData()}
                  />

                  {/* Privacy Settings */}
                  <PrivacySettings
                    showPhoneNumber={showPhoneNumber}
                    showEmail={showEmail}
                    showSocials={showSocials}
                    onPhoneNumberVisibilityChange={
                      handlePhoneNumberVisibilityChange
                    }
                    onEmailVisibilityChange={handleEmailVisibilityChange}
                    onSocialsVisibilityChange={handleSocialsVisibilityChange}
                    className="mb-8"
                  />

                  {/* Danger Zone */}
                  <DangerZone
                    onDeleteAccount={() => setIsDeleteAccountOpen(true)}
                  />
                </div>
              </div>
            )}

            {/* Other tabs content */}
            {!["overview", "services", "portfolio", "settings"].includes(
              activeTab,
            ) && (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} tab
                  content coming soon...
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This tab will be implemented with full functionality.
                </p>
              </div>
            )}
          </div>
        </CustomCard>
      </main>

      <Footer />

      {/* Modals */}
      <ServiceEditModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSave={handleSaveService}
        service={editingService}
        mode={editingService ? "edit" : "add"}
      />

      <ConsultationEditModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        onSave={handleSaveConsultation}
        consultation={editingConsultation}
        mode={editingConsultation ? "edit" : "add"}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={deleteItem?.title || ""}
        type={deleteItem?.type || "service"}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
      />
    </div>
  );
}

export default function ModernProviderDashboard() {
  return (
    <ProviderProvider>
      <ModernProviderDashboardContent />
    </ProviderProvider>
  );
}
