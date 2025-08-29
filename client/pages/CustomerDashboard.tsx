import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { TooltipProvider } from "../components/ui/tooltip";
import { useLanguage } from "../lib/LanguageContext";
import {
  LanguageSkill,
  Task,
  CustomerProfile,
  Booking,
  Review,
  Activity,
} from "../Types";
import { useAuth } from "../lib/AuthContext";
import { useSubscription } from "../lib/SubscriptionContext";
import { useCustomer } from "../lib/CustomerContext";
import { useToast } from "../hooks/use-toast";
import { useVerificationRestrictions } from "../hooks/useVerificationRestrictions";
import { EmailVerificationAlert } from "../components/EmailVerificationAlert";
import PhotoUpload from "../components/PhotoUpload";
import LanguageAutocomplete from "../components/LanguageAutocomplete";
import {
  Plus,
  Calendar,
  Star,
  Search,
  MapPin,
  Edit,
  Globe,
  Linkedin,
  Github,
  Lock,
  Save,
  X,
  Mail,
  Phone,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { AuthApi } from "../lib/ApiClient";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";
import { getLocalizedLanguageName } from "../data/languages";
import Card from "../components/Card";

function CustomerDashboard() {
  const { currentLanguage, t } = useLanguage();
  const { user, logout, deleteAccount, updateEmail, setCurrentProfilePhoto } =
    useAuth();
  const { customer, stats, isLoading: customerLoading } = useCustomer();
  const { openSubscriptionModal } = useSubscription();
  const { isRestricted, restrictionMessage } = useVerificationRestrictions();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "bookings" | "feedback" | "settings"
  >("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { toast } = useToast();
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [originalProfile, setOriginalProfile] =
    useState<CustomerProfile | null>(null);

  // Touch/swipe state for mobile tab navigation
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Privacy settings state
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);
  const [showEmail, setShowEmail] = useState(true);

  // Email update state
  const [editableEmail, setEditableEmail] = useState(user?.email || "");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  // Check if email has changed from the original
  const hasEmailChanged = editableEmail !== user?.email;

  // Sync editableEmail with user email when user data changes
  useEffect(() => {
    if (user?.email) {
      setEditableEmail(user.email);
    }
  }, [user?.email]);
  const [showSocials, setShowSocials] = useState(true);

  // Centralized state for the customer profile, initialized with default values
  const [profile, setProfile] = useState<CustomerProfile>({
    photo: "https://avatar.vercel.sh/customer.png?size=150",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    bio: "",
    languages: [],
    linkedinUrl: "",
    websiteUrl: "",
    githubUrl: "",
    location: "",
    phoneNumber: "",
    memberSince: "",
    rating: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    if (customer) {
      // Map customer data to profile format, providing defaults for missing properties
      setProfile({
        photo:
          customer.photo || "https://avatar.vercel.sh/customer.png?size=150",
        firstName: customer.name?.split(" ")[0] || "",
        lastName: customer.name?.split(" ").slice(1).join(" ") || "",
        company: customer.company || "",
        email: customer.email || "",
        bio: customer.bio || "",
        languages: customer.languages || [],
        linkedinUrl: customer.linkedin || "",
        websiteUrl: customer.website || "",
        githubUrl: "",
        location: customer.location || "",
        phoneNumber: customer.phone || "",
        memberSince: customer.memberSince || "",
        rating: 0, // Customer doesn't have rating yet
        reviewCount: 0, // Customer doesn't have reviewCount yet
      });
    }
  }, [customer]);

  const handleEditProfile = () => {
    if (isRestricted) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Требуется подтверждение"
            : currentLanguage === "en"
              ? "Verification Required"
              : "Vajalik kinnitamine",
        description:
          currentLanguage === "ru"
            ? "Подтвердите email чтобы получить доступ к этой функции."
            : currentLanguage === "et"
              ? "Kinnitage e-mail, et saada juurdepääs sellele funktsioonile."
              : "Please verify your email to access this feature.",
        variant: "destructive",
      });
      return;
    }
    setOriginalProfile({ ...profile });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsEditingProfile(false);
      setOriginalProfile(null);

      toast({
        title:
          currentLanguage === "ru"
            ? "Профиль обновлён!"
            : currentLanguage === "en"
              ? "Profile updated successfully!"
              : "Profiil edukalt uuendatud!",
        description:
          currentLanguage === "ru"
            ? "И��менения ��охранены"
            : currentLanguage === "en"
              ? "Your changes have been saved"
              : "Teie muudatused on salvestatud",
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

  const handleCancelEdit = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditingProfile(false);
    setOriginalProfile(null);
  };

  const handleLanguagesChange = (languages: LanguageSkill[]) => {
    setProfile({ ...profile, languages });
  };

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

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    if (isLeftSwipe && currentIndex < tabs.length - 1) {
      // Swipe left - go to next tab
      setActiveTab(tabs[currentIndex + 1].id as any);
    } else if (isRightSwipe && currentIndex > 0) {
      // Swipe right - go to previous tab
      setActiveTab(tabs[currentIndex - 1].id as any);
    }
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, requirements: [] };

    const requirements = [
      { met: password.length >= 8, text: "At least 8 characters" },
      { met: /[A-Z]/.test(password), text: "One uppercase letter" },
      { met: /[a-z]/.test(password), text: "One lowercase letter" },
      { met: /\d/.test(password), text: "One digit" },
      {
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        text: "One special character",
      },
    ];

    const metCount = requirements.filter((req) => req.met).length;
    const strength = (metCount / requirements.length) * 100;

    return { strength, requirements };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  // Password change handler
  const handlePasswordChange = async () => {
    // Validate required fields based on whether password is already set
    const requiredFields = user?.isPasswordSet
      ? [
          passwordData.currentPassword,
          passwordData.newPassword,
          passwordData.confirmPassword,
        ]
      : [passwordData.newPassword, passwordData.confirmPassword];

    if (requiredFields.some((field) => !field)) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Заполните все поля"
            : currentLanguage === "en"
              ? "Fill all fields"
              : "Täitke kõik väljad",
        description:
          currentLanguage === "ru"
            ? "Все поля пароля обязательны для заполнения."
            : currentLanguage === "en"
              ? "All password fields are required."
              : "Kõik parooli väljad on kohustuslikud.",
        variant: "destructive",
      });
      return;
    }

    // Check password complexity requirements
    const { requirements } = getPasswordStrength(passwordData.newPassword);
    const unmetRequirements = requirements.filter(req => !req.met);
    
    if (unmetRequirements.length > 0) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Пароль не соответствует требованиям"
            : currentLanguage === "en"
              ? "Password doesn't meet requirements"
              : "Parool ei vasta nõuetele",
        description:
          currentLanguage === "ru"
            ? "Пароль должен соответствовать всем требованиям безопасности."
            : currentLanguage === "en"
              ? "Password must meet all security requirements."
              : "Parool peab vastama kõigile turvanõuetele.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Пароли не совпадают"
            : currentLanguage === "en"
              ? "Passwords do not match"
              : "Paroolid ei ühti",
        description:
          currentLanguage === "ru"
            ? "Новый пароль и подтверждение должны совпадать."
            : currentLanguage === "en"
              ? "New password and confirmation must match."
              : "Uus parool ja kinnitus peavad ühtima.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await AuthApi.changePassword(
        user?.isPasswordSet ? passwordData.currentPassword : "",
        passwordData.newPassword,
      );

      if (error) {
        throw new Error(error);
      }

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // If this was setting password for the first time, refresh user data
      if (!user?.isPasswordSet) {
        // Password was set for the first time
      }

      toast({
        title: user?.isPasswordSet
          ? currentLanguage === "ru"
            ? "Пароль обновлён"
            : currentLanguage === "en"
              ? "Password updated"
              : "Parool uuendatud"
          : currentLanguage === "ru"
            ? "Пароль установлен"
            : currentLanguage === "en"
              ? "Password set"
              : "Parool määratud",
        description: user?.isPasswordSet
          ? currentLanguage === "ru"
            ? "Ваш пароль был успешно обновлён."
            : currentLanguage === "en"
              ? "Your password has been successfully updated."
              : "Teie parool on edukalt uuendatud."
          : currentLanguage === "ru"
            ? "Ваш пароль был успе��но установлен."
            : currentLanguage === "en"
              ? "Your password has been successfully set."
              : "Teie parool on edukalt määratud.",
        variant: "default",
      });
    } catch (err: any) {
      console.error("Failed to change password:", err);
      toast({
        title:
          currentLanguage === "ru"
            ? "Ошибка обновления пароля"
            : currentLanguage === "en"
              ? "Password Update Failed"
              : "Parooli värskendamine ebaõnnestus",
        description: err.message || "An unknown error occurred.",
        variant: "destructive",
      });
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

  // Privacy settings handlers
  const handlePhoneNumberVisibilityChange = (checked: boolean) => {
    setShowPhoneNumber(checked);
    setTimeout(() => {
      toast({
        title:
          currentLanguage === "ru"
            ? "Настройки приватности обнов��ены"
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
            ? "Настройки приватности обновлен��"
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
            ? "Наст��ойки ��риватности обновлены"
            : currentLanguage === "en"
              ? "Privacy settings updated"
              : "Privaatsuse seaded uuendatud",
        description: checked
          ? currentLanguage === "ru"
            ? "Социальные ��ети теперь видн�� в профиле."
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

  if (customerLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customer dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: t.customerDashboard.overview || "Overview" },
    { id: "tasks", label: t.customerDashboard.tasks || "My Tasks" },
    { id: "bookings", label: t.customerDashboard.bookings || "Bookings" },
    { id: "feedback", label: t.customerDashboard.feedback || "Feedback" },
    { id: "settings", label: t.customerDashboard.settings || "Settings" },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <SEO
          title={`${t.customerDashboard.overview || "Customer Dashboard"} | QuickHire`}
          description="Customer dashboard for managing tasks, bookings, and profile"
          url={`https://quickhire.ee/${currentLanguage}/dashboard/customer`}
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

          {/* Customer Profile Header - Matching Provider Style */}
          <Card border shadow="sm" className="mb-3 sm:mb-6">
            <div className="p-3 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
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
                    className={`flex items-center font-medium text-sm transition-colors px-3 py-2 rounded-lg ${
                      isRestricted
                        ? "text-gray-400 cursor-not-allowed bg-gray-100"
                        : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {isRestricted ? (
                      <Lock className="h-4 w-4 mr-2" />
                    ) : (
                      <Edit className="h-4 w-4 mr-2" />
                    )}
                    {currentLanguage === "ru"
                      ? "Редактировать"
                      : currentLanguage === "en"
                        ? "Edit"
                        : "Muuda"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {/* Main Profile Info */}
                <div>
                  {isEditingProfile ? (
                    <div className="space-y-8">
                      {/* Basic Information Section */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                        <div className="flex items-center mb-6">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {currentLanguage === "ru"
                              ? "Основная ��нформация"
                              : currentLanguage === "en"
                                ? "Basic Information"
                                : "Põhiinfo"}
                          </h3>
                        </div>

                        {/* Photo Upload */}
                        <PhotoUpload
                          currentPhoto={user?.profileImage || profile.photo}
                          onPhotoChange={(photoData) => {
                            setProfile({
                              ...profile,
                              photo: photoData,
                            });
                            setCurrentProfilePhoto(photoData);
                          }}
                          size="md"
                          className="mb-6"
                        />

                        {/* Personal Details */}
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {currentLanguage === "ru"
                                  ? "Имя"
                                  : currentLanguage === "en"
                                    ? "First Name"
                                    : "Eesnimi"}
                              </label>
                              <input
                                type="text"
                                value={profile.firstName}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    firstName: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {currentLanguage === "ru"
                                  ? "Фамилия"
                                  : currentLanguage === "en"
                                    ? "Last Name"
                                    : "Perekonnanimi"}
                              </label>
                              <input
                                type="text"
                                value={profile.lastName}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    lastName: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {currentLanguage === "ru"
                                ? "Компания (необязательно)"
                                : currentLanguage === "en"
                                  ? "Company (optional)"
                                  : "Ettevõte (valikuline)"}
                            </label>
                            <input
                              type="text"
                              value={profile.company}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  company: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        {/* Email Section */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {currentLanguage === "ru"
                              ? "E-mail"
                              : currentLanguage === "en"
                                ? "Email"
                                : "E-mail"}
                          </label>
                          <div className="space-y-3">
                            <div className="relative">
                              <input
                                type="email"
                                value={editableEmail}
                                onChange={(e) =>
                                  setEditableEmail(e.target.value)
                                }
                                className="w-full pr-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                placeholder={
                                  currentLanguage === "ru"
                                    ? "ваш@email.com"
                                    : currentLanguage === "en"
                                      ? "your@email.com"
                                      : "sinu@email.com"
                                }
                              />
                              {user?.isEmailVerified && !hasEmailChanged && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {currentLanguage === "ru"
                                      ? "Подтверждён"
                                      : currentLanguage === "en"
                                        ? "Verified"
                                        : "Kinnitatud"}
                                  </span>
                                </div>
                              )}
                            </div>
                            {hasEmailChanged && (
                              <button
                                onClick={handleUpdateEmail}
                                disabled={isUpdatingEmail || !editableEmail}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                              >
                                {isUpdatingEmail ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {currentLanguage === "ru"
                                      ? "Обновляется..."
                                      : currentLanguage === "en"
                                        ? "Updating..."
                                        : "Uuendatakse..."}
                                  </>
                                ) : (
                                  <>
                                    <Mail className="h-4 w-4 mr-2" />
                                    {currentLanguage === "ru"
                                      ? "Обновить Email"
                                      : currentLanguage === "en"
                                        ? "Update Email"
                                        : "Uuenda E-mail"}
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {currentLanguage === "ru"
                              ? "О себе"
                              : currentLanguage === "en"
                                ? "About Me"
                                : "Minust"}
                          </label>
                          <textarea
                            value={profile.bio}
                            onChange={(e) =>
                              setProfile({ ...profile, bio: e.target.value })
                            }
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                            placeholder={
                              currentLanguage === "ru"
                                ? "Рас��кажите о себе или своей компании..."
                                : currentLanguage === "en"
                                  ? "Tell us about yourself or your company..."
                                  : "Rääkige endast või oma ettevõttest..."
                            }
                          />
                        </div>

                        {/* Languages */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {currentLanguage === "ru"
                              ? "Владею языками"
                              : currentLanguage === "en"
                                ? "Languages Spoken"
                                : "Valdab keeli"}
                          </label>
                          <LanguageAutocomplete
                            value={profile.languages || []}
                            onChange={handleLanguagesChange}
                            placeholder={
                              currentLanguage === "ru"
                                ? "Поиск и добавление языков..."
                                : currentLanguage === "en"
                                  ? "Search and add languages..."
                                  : "Otsi ja lisa keeli..."
                            }
                          />
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100">
                        <div className="flex items-center mb-6">
                          <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {currentLanguage === "ru"
                              ? "Контактная информация"
                              : currentLanguage === "en"
                                ? "Contact Information"
                                : "Kontaktandmed"}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                              <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                              <span>
                                {currentLanguage === "ru"
                                  ? "Телефон"
                                  : currentLanguage === "en"
                                    ? "Phone Number"
                                    : "Telefoninumber"}
                              </span>
                            </label>
                            <input
                              type="tel"
                              value={profile.phoneNumber || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  phoneNumber: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                              placeholder="+372 XXXX XXXX"
                            />
                          </div>
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                              <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                              <span>
                                {currentLanguage === "ru"
                                  ? "Местоположение"
                                  : currentLanguage === "en"
                                    ? "Location"
                                    : "Asukoht"}
                              </span>
                            </label>
                            <input
                              type="text"
                              value={profile.location || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  location: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                              placeholder={
                                currentLanguage === "ru"
                                  ? "Город, Страна"
                                  : currentLanguage === "en"
                                    ? "City, Country"
                                    : "Linn, riik"
                              }
                            />
                          </div>
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                              <Globe className="h-4 w-4 mr-3 flex-shrink-0" />
                              <span>
                                {currentLanguage === "ru"
                                  ? "Веб-сайт"
                                  : currentLanguage === "en"
                                    ? "Website"
                                    : "Veebileht"}
                              </span>
                            </label>
                            <input
                              type="url"
                              value={profile.websiteUrl || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  websiteUrl: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                              <Linkedin className="h-4 w-4 mr-3 flex-shrink-0" />
                              <span>LinkedIn</span>
                            </label>
                            <input
                              type="url"
                              value={profile.linkedinUrl || ""}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  linkedinUrl: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* View Mode - Main Info */}
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                        <PhotoUpload
                          currentPhoto={user?.profileImage || profile.photo}
                          onPhotoChange={() => {}} // Read-only in view mode
                          size="md"
                          showUploadButton={false}
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
                        />
                        <div className="flex-1 text-center sm:text-left">
                          <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                              {profile.firstName} {profile.lastName}
                            </h1>
                          </div>

                          {profile.company && (
                            <p className="text-lg text-gray-600 mb-3 font-medium">
                              {profile.company}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                            {profile.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {profile.location}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                              {profile.rating} ({profile.reviewCount} reviews)
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {currentLanguage === "ru"
                                ? "Участник с"
                                : currentLanguage === "en"
                                  ? "Member since"
                                  : "Liige alates"}{" "}
                              {profile.memberSince || ""}
                            </div>
                          </div>

                          {profile.bio && (
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {profile.bio}
                            </p>
                          )}

                          {/* Languages Display in View Mode */}
                          {profile.languages &&
                            profile.languages.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                  {currentLanguage === "ru"
                                    ? "Владею языками"
                                    : currentLanguage === "en"
                                      ? "Languages Spoken"
                                      : "Valdab keeli"}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {profile.languages.map((langSkill, index) => {
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
                                            ? "��азговорный"
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
                                      : langSkill.name || "Unknown Language";
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
                      {(profile.phoneNumber ||
                        profile.websiteUrl ||
                        profile.linkedinUrl) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            {currentLanguage === "ru"
                              ? "Контакты"
                              : currentLanguage === "en"
                                ? "Contact"
                                : "Kontakt"}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            {profile.phoneNumber && (
                              <div className="flex items-center text-gray-600">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>{profile.phoneNumber}</span>
                              </div>
                            )}
                            {profile.websiteUrl && (
                              <a
                                href={profile.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <Globe className="h-4 w-4 mr-2" />
                                <span>Website</span>
                              </a>
                            )}
                            {profile.linkedinUrl && (
                              <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <Linkedin className="h-4 w-4 mr-2" />
                                <span>LinkedIn</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons for Edit Mode */}
              {isEditingProfile && (
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 mt-8 border-t border-gray-200">
                  <button
                    onClick={handleCancelEdit}
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
          </Card>

          {/* Tab Navigation */}
          <Card border shadow="sm" className="mb-3 sm:mb-6 lg:mb-8">
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
                  const isLocked = isRestricted;
                  return (
                    <button
                      key={tab.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isLocked) {
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
                        const currentScrollY = window.scrollY;
                        setActiveTab(tab.id as any);
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
                      {currentLanguage === "ru"
                        ? `Добро пожаловать, ${profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.firstName || user?.name || "User"}!`
                        : currentLanguage === "en"
                          ? `Welcome back, ${profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.firstName || user?.name || "User"}!`
                          : `Tere tulemast tagasi, ${profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.firstName || user?.name || "User"}!`}
                    </h2>
                    <p className="text-gray-600">
                      {currentLanguage === "ru"
                        ? "Управляйте своими проектами и заказами"
                        : currentLanguage === "en"
                          ? "Manage your projects and orders"
                          : "Hallake oma projekte ja tellimusi"}
                    </p>
                  </div>

                  {/* Recent Activity Section */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {currentLanguage === "ru"
                        ? "Недавняя активность"
                        : currentLanguage === "en"
                          ? "Recent Activity"
                          : "Hiljutine tegevus"}
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <Clock className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-900 font-medium mb-2">
                        {currentLanguage === "ru"
                          ? "Активности пока нет"
                          : currentLanguage === "en"
                            ? "No activity yet"
                            : "Tegevust pole veel"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {currentLanguage === "ru"
                          ? "Ваша активность появи��ся здесь, ��огда вы начнёте пользоваться платформой."
                          : currentLanguage === "en"
                            ? "Your activity will appear here when you start using the platform."
                            : "Teie tegevus ilmub siia, kui hakkate platvormi kasutama."}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions Section */}
                  <Card border shadow="sm" padding="md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {currentLanguage === "ru"
                        ? "Быстрые действия"
                        : currentLanguage === "en"
                          ? "Quick Actions"
                          : "Kiired tegevused"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {/* Post Task - Now Locked */}
                      <button
                        onClick={() => openSubscriptionModal("post-task")}
                        className="w-full flex items-center p-3 sm:p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all duration-200 opacity-75 hover:opacity-100 group min-h-[60px] sm:min-h-[70px]"
                        title={
                          currentLanguage === "ru"
                            ? "Доступно с подпиской - Создавайте задачи и находите фрилансеров"
                            : currentLanguage === "en"
                              ? "Available with subscription - Post tasks and find freelancers"
                              : "Saadaval tellimuse korral - Postitada ülesandeid ja leida vabakutselisi"
                        }
                      >
                        <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors relative">
                          <Plus className="h-5 w-5 text-blue-600" />
                          <Lock className="h-3 w-3 text-blue-700 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 group-hover:text-blue-900">
                            {currentLanguage === "ru"
                              ? "Создать задачу"
                              : currentLanguage === "en"
                                ? "Post New Task"
                                : "Loo uus ülesanne"}
                          </p>
                          <p className="text-sm text-blue-600 group-hover:text-blue-700">
                            {currentLanguage === "ru"
                              ? "Требуется подписка"
                              : currentLanguage === "en"
                                ? "Requires subscription"
                                : "Vajab tellimust"}
                          </p>
                        </div>
                      </button>

                      {/* Book Consultation - Now Locked */}
                      <button
                        onClick={() =>
                          openSubscriptionModal("book-consultation")
                        }
                        className="w-full flex items-center p-3 sm:p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 hover:border-amber-300 transition-all duration-200 opacity-75 hover:opacity-100 group min-h-[60px] sm:min-h-[70px]"
                        title={
                          currentLanguage === "ru"
                            ? "Доступно с подп��ской - ��абронируйте консультации экспертов"
                            : currentLanguage === "en"
                              ? "Available with subscription - Book expert consultations"
                              : "Saadaval tellimuse korral - Broneeri ekspertide konsultatsioone"
                        }
                      >
                        <div className="p-2 bg-amber-100 rounded-lg mr-3 group-hover:bg-amber-200 transition-colors relative">
                          <Calendar className="h-5 w-5 text-amber-600" />
                          <Lock className="h-3 w-3 text-amber-700 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 group-hover:text-amber-900">
                            {currentLanguage === "ru"
                              ? "Забронировать консультацию"
                              : currentLanguage === "en"
                                ? "Book Consultation"
                                : "Broneeri konsultatsioon"}
                          </p>
                          <p className="text-sm text-amber-600 group-hover:text-amber-700">
                            {currentLanguage === "ru"
                              ? "Требуется подписка"
                              : currentLanguage === "en"
                                ? "Requires subscription"
                                : "Vajab tellimust"}
                          </p>
                        </div>
                      </button>

                      {/* Browse Providers - Now Locked */}
                      <button
                        onClick={() => openSubscriptionModal("view-profile")}
                        className="w-full flex items-center p-3 sm:p-4 border border-dashed border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 hover:border-purple-300 transition-all duration-200 opacity-75 hover:opacity-100 group min-h-[60px] sm:min-h-[70px]"
                        title={
                          currentLanguage === "ru"
                            ? "Д��ступно с подпиской - Найдите лучших талантов и поставщиков"
                            : currentLanguage === "en"
                              ? "Available with subscription - Find top talent and providers"
                              : "Saadaval tellimuse korral - Leidke parimaid talente ja teenusepakkujaid"
                        }
                      >
                        <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors relative">
                          <Search className="h-5 w-5 text-purple-600" />
                          <Lock className="h-3 w-3 text-purple-700 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700 group-hover:text-purple-900">
                            {currentLanguage === "ru"
                              ? "Найти поставщиков"
                              : currentLanguage === "en"
                                ? "Browse Providers"
                                : "Sirvi teenusepakkujaid"}
                          </p>
                          <p className="text-sm text-purple-600 group-hover:text-purple-700">
                            {currentLanguage === "ru"
                              ? "Требуется подписка"
                              : currentLanguage === "en"
                                ? "Requires subscription"
                                : "Vajab tellimust"}
                          </p>
                        </div>
                      </button>
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6 sm:space-y-8">
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
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {user?.isPasswordSet
                          ? currentLanguage === "ru"
                            ? "Изменить пароль"
                            : currentLanguage === "en"
                              ? "Change Password"
                              : "Muuda parooli"
                          : currentLanguage === "ru"
                            ? "Установить пароль"
                            : currentLanguage === "en"
                              ? "Set Password"
                              : "Määra parool"}
                      </h3>

                      <div className="max-w-md space-y-4">
                        {user?.isPasswordSet && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {currentLanguage === "ru"
                                ? "Текущий пароль"
                                : currentLanguage === "en"
                                  ? "Current Password"
                                  : "Praegune parool"}
                            </label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="••••••••"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user?.isPasswordSet
                              ? currentLanguage === "ru"
                                ? "Новый пароль"
                                : currentLanguage === "en"
                                  ? "New Password"
                                  : "Uus parool"
                              : currentLanguage === "ru"
                                ? "Пароль"
                                : currentLanguage === "en"
                                  ? "Password"
                                  : "Parool"}
                          </label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                          />
                          
                          {/* Password Strength Indicator */}
                          {passwordData.newPassword && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                  {currentLanguage === "ru"
                                    ? "Сила пароля"
                                    : currentLanguage === "en"
                                      ? "Password Strength"
                                      : "Parooli tugevus"}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {passwordStrength.strength}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    passwordStrength.strength < 40
                                      ? "bg-red-500"
                                      : passwordStrength.strength < 80
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{ width: `${passwordStrength.strength}%` }}
                                ></div>
                              </div>
                              
                              {/* Password Requirements */}
                              <div className="mt-3 space-y-1">
                                {passwordStrength.requirements.map((req, index) => (
                                  <div
                                    key={index}
                                    className={`flex items-center text-xs ${
                                      req.met ? "text-green-600" : "text-gray-500"
                                    }`}
                                  >
                                    {req.met ? (
                                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                                    ) : (
                                      <div className="h-3 w-3 mr-2 rounded-full border border-gray-300"></div>
                                    )}
                                    {req.text}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {user?.isPasswordSet
                              ? currentLanguage === "ru"
                                ? "Подтвердить новый пароль"
                                : currentLanguage === "en"
                                  ? "Confirm New Password"
                                  : "Kinnita uut parooli"
                              : currentLanguage === "ru"
                                ? "Подтвердить пароль"
                                : currentLanguage === "en"
                                  ? "Confirm Password"
                                  : "Kinnita parooli"}
                          </label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••���•••••"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handlePasswordChange}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            {user?.isPasswordSet
                              ? currentLanguage === "ru"
                                ? "Обновить пароль"
                                : currentLanguage === "en"
                                  ? "Update Password"
                                  : "Uuenda parooli"
                              : currentLanguage === "ru"
                                ? "Установить пароль"
                                : currentLanguage === "en"
                                  ? "Set Password"
                                  : "Määra parool"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {currentLanguage === "ru"
                          ? "Настройки приватности"
                          : currentLanguage === "en"
                            ? "Privacy Settings"
                            : "Privaatsuse seaded"}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {currentLanguage === "ru"
                                ? "Показать номер телефона"
                                : currentLanguage === "en"
                                  ? "Show Phone Number"
                                  : "Näita telefoninumbrit"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {currentLanguage === "ru"
                                ? "Разрешить провайдерам видеть ваш номер телефона"
                                : currentLanguage === "en"
                                  ? "Allow providers to see your phone number"
                                  : "Luba teenusepakkujatel näha teie telefoninumbrit"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={showPhoneNumber}
                              onChange={(e) =>
                                handlePhoneNumberVisibilityChange(
                                  e.target.checked,
                                )
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {currentLanguage === "ru"
                                ? "Показать email адрес"
                                : currentLanguage === "en"
                                  ? "Show Email Address"
                                  : "Näita e-posti aadressi"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {currentLanguage === "ru"
                                ? "Разрешить провайдерам видеть ваш email адрес"
                                : currentLanguage === "en"
                                  ? "Allow providers to see your email address"
                                  : "Luba teenusepakkujatel näha teie e-posti aadressi"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={showEmail}
                              onChange={(e) =>
                                handleEmailVisibilityChange(e.target.checked)
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {currentLanguage === "ru"
                                ? "Показать социальные сети"
                                : currentLanguage === "en"
                                  ? "Show Social Links"
                                  : "Näita sotsiaalmeedia linke"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {currentLanguage === "ru"
                                ? "Показать все социальные сети в профиле"
                                : currentLanguage === "en"
                                  ? "Show all social links in your profile"
                                  : "Näita kõiki sotsiaalmeedia linke teie profiilis"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={showSocials}
                              onChange={(e) =>
                                handleSocialsVisibilityChange(e.target.checked)
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-2">
                        {currentLanguage === "ru"
                          ? "Опасная зона"
                          : currentLanguage === "en"
                            ? "Danger Zone"
                            : "Ohtlik tsoon"}
                      </h3>
                      <p className="text-sm text-red-700 mb-4">
                        {currentLanguage === "ru"
                          ? "Удаление аккаунта необратимо. Все ��аши данные будут потеряны."
                          : currentLanguage === "en"
                            ? "Deleting your account is irreversible. All your data will be lost."
                            : "Konto kustutamine on pöördumatu. Kõik teie andmed lähevad kaotsi."}
                      </p>
                      <button
                        onClick={() => setIsDeleteAccountOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        {currentLanguage === "ru"
                          ? "Удалить аккаунт"
                          : currentLanguage === "en"
                            ? "Delete Account"
                            : "Kustuta konto"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs content */}
              {!["overview", "settings"].includes(activeTab) && (
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
          </Card>
        </main>

        <Footer />

        {/* Delete Account Modal */}
        <DeleteAccountModal
          isOpen={isDeleteAccountOpen}
          onClose={() => setIsDeleteAccountOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}

export default CustomerDashboard;
