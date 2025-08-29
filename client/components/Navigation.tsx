import { Link } from "react-router-dom";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";
import NotificationBell from "./NotificationBell";
import RoleToggle from "./RoleToggle";

export default function Navigation() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { currentLanguage, t, changeLanguage, languages } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  // Get profile picture from multiple sources
  const getProfilePicture = () => {
    // Use the user's profileImage from AuthContext - this gets updated when photos change
    if (user?.profileImage) {
      return user.profileImage;
    }

    return null;
  };

  const profilePicture = getProfilePicture();

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (langCode: string) => {
    const language = languages.find((lang) => lang.code === langCode);
    if (language) {
      // Show notification before changing language (using current language)
      toast({
        title:
          currentLanguage === "ru"
            ? "Язык изменён"
            : currentLanguage === "en"
              ? "Language changed"
              : "Keel muudetud",
        description:
          currentLanguage === "ru"
            ? `Язык изменён на ${language.name}`
            : currentLanguage === "en"
              ? `Language changed to ${language.name}`
              : `Keel muudetud keelele ${language.name}`,
        variant: "default",
      });

      // Change language after showing notification
      changeLanguage(language.code);
      setIsLanguageOpen(false);
    }
  };

  const currentLangData = languages.find(
    (lang) => lang.code === currentLanguage,
  );

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isLanguageOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with reduced spacing */}
            <div className="flex-shrink-0">
              <Link
                to={`/${currentLanguage}`}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                QuickHire
              </Link>
            </div>

            {/* Center Navigation Links - Desktop with better spacing */}
            <div className="hidden lg:flex items-center">
              {/* Main navigation with 24px gap from logo */}
              <div className="flex items-center space-x-6 ml-6">
                <Link
                  to={`/${currentLanguage}/providers`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t.nav.talent}
                </Link>
                <Link
                  to={`/${currentLanguage}/consultations`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t.nav.consultations}
                </Link>
                <Link
                  to={`/${currentLanguage}/tasks`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t.nav.projects}
                </Link>
              </div>

              {/* Divider and Pricing with proper spacing */}
              <div className="flex items-center ml-6">
                <div className="w-px h-6 bg-gray-300 mr-6"></div>
                <Link
                  to={`/${currentLanguage}/pricing`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t.nav.pricing}
                </Link>
              </div>
            </div>

            {/* Right Side - Language & Auth with proper spacing */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div
                className="relative hidden lg:block"
                ref={languageDropdownRef}
              >
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors outline-none"
                >
                  <span className="mr-1">{currentLangData?.flag}</span>
                  {currentLangData?.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isLanguageOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-lg z-[100]"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleLanguageChange(language.code);
                          }}
                          className={`w-full text-left block px-4 py-2.5 text-sm transition-colors ${
                            currentLanguage === language.code
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          <span className="mr-2">{language.flag}</span>
                          {language.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Notification Bell */}
                  <NotificationBell />

                  {/* Role Toggle */}
                  <RoleToggle />

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-2 text-sm font-medium transition-colors outline-none"
                    >
                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt={user.firstName}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-gray-200 mr-1.5 sm:mr-2"
                        />
                      ) : (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-1.5 sm:mr-2 text-xs font-medium">
                          {user.firstName.charAt(0).toUpperCase()}
                          {user.lastName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="mr-1 hidden sm:inline">
                        {user.firstName}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                            <p className="text-xs text-blue-600 font-medium mt-1">
                              {user.accountType === "provider"
                                ? currentLanguage === "ru"
                                  ? "Таланты"
                                  : currentLanguage === "en"
                                    ? "Talent"
                                    : "Talent"
                                : currentLanguage === "ru"
                                  ? "Клиент"
                                  : currentLanguage === "en"
                                    ? "Customer"
                                    : "Klient"}
                            </p>
                          </div>
                          <Link
                            to={`/${currentLanguage}/dashboard/${user.accountType}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-2 inline" />
                            {currentLanguage === "ru"
                              ? "Панель управления"
                              : currentLanguage === "en"
                                ? "Dashboard"
                                : "Juhtpaneel"}
                          </Link>

                          <button
                            onClick={() => {
                              toast({
                                title:
                                  currentLanguage === "ru"
                                    ? "Вы ��ышли из системы"
                                    : currentLanguage === "en"
                                      ? "Logged out successfully"
                                      : "Edukalt välja logitud",
                                description:
                                  currentLanguage === "ru"
                                    ? "До ��видания! Увидимся скоро."
                                    : currentLanguage === "en"
                                      ? "Goodbye! See you soon."
                                      : "Head aega! Näeme varsti.",
                                variant: "default",
                              });
                              // Small delay to show notification before redirect
                              setTimeout(() => {
                                logout();
                              }, 500);
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-2 inline" />
                            {currentLanguage === "ru"
                              ? "Выйти"
                              : currentLanguage === "en"
                                ? "Logout"
                                : "Logi välja"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Auth Links */
                <>
                  <Link
                    to={`/${currentLanguage}/login`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    to={`/${currentLanguage}/signup`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                  >
                    {t.nav.signUp}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200/50 py-4 bg-white/95 backdrop-blur-md">
              <div className="space-y-2">
                <Link
                  to={`/${currentLanguage}/providers`}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.talent}
                </Link>
                <Link
                  to={`/${currentLanguage}/consultations`}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.consultations}
                </Link>
                <Link
                  to={`/${currentLanguage}/tasks`}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.projects}
                </Link>
                <Link
                  to={`/${currentLanguage}/pricing`}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav.pricing}
                </Link>

                {/* Mobile Auth Section */}
                {isAuthenticated && user ? (
                  <div className="border-t border-gray-200/50 mt-4 pt-4">
                    <div className="px-3 py-2 mb-2">
                      <div className="flex items-center">
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt={user.firstName}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 mr-3"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                            {user.firstName.charAt(0).toUpperCase()}
                            {user.lastName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/${currentLanguage}/dashboard/${user.accountType}`}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2 inline" />
                      {currentLanguage === "ru"
                        ? "Панель управления"
                        : currentLanguage === "en"
                          ? "Dashboard"
                          : "Juhtpaneel"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left block px-3 py-2 text-red-600 hover:text-red-50/80 rounded-md font-medium transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2 inline" />
                      {currentLanguage === "ru"
                        ? "Выйти"
                        : currentLanguage === "en"
                          ? "Logout"
                          : "Logi välja"}
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200/50 mt-4 pt-4 space-y-2">
                    <Link
                      to={`/${currentLanguage}/login`}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t.nav.login}
                    </Link>
                    <Link
                      to={`/${currentLanguage}/signup`}
                      className="block mx-3 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t.nav.signUp}
                    </Link>
                  </div>
                )}

                {/* Mobile Language Selector */}
                <div className="px-3 py-2 border-t border-gray-200/50 mt-4 pt-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {t.nav.language}
                  </p>
                  <div className="space-y-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          handleLanguageChange(language.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left block px-3 py-2 text-sm rounded-md transition-colors ${
                          currentLanguage === language.code
                            ? "bg-blue-50/80 text-blue-600"
                            : "text-gray-700 hover:bg-blue-50/80 hover:text-blue-600"
                        }`}
                      >
                        <span className="mr-2">{language.flag}</span>
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
