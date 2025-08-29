import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import GateModal from "../components/modals/GateModal";
import { useGate } from "../hooks/useGate";
import { useToast } from "../components/ui/use-toast";
import {
  User,
  MessageCircle,
  Edit,
  Code,
  Palette,
  Brain,
  TrendingUp,
  Languages,
  Shield,
  Calculator,
  Scale,
  Users,
  Building,
  MoreHorizontal,
  Star,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

const categoryIcons = [
  {
    key: "developmentIt",
    icon: Code,
    color: "text-blue-600",
    slug: "development-it",
  },
  {
    key: "designCreative",
    icon: Palette,
    color: "text-purple-600",
    slug: "design-creative",
  },
  {
    key: "aiServices",
    icon: Brain,
    color: "text-teal-600",
    slug: "ai-services",
  },
  {
    key: "salesMarketing",
    icon: TrendingUp,
    color: "text-green-600",
    slug: "sales-marketing",
  },
  {
    key: "writingTranslation",
    icon: Languages,
    color: "text-yellow-600",
    slug: "writing-translation",
  },
  {
    key: "adminSupport",
    icon: Shield,
    color: "text-red-600",
    slug: "admin-support",
  },
  {
    key: "financeAccounting",
    icon: Calculator,
    color: "text-indigo-600",
    slug: "finance-accounting",
  },
  { key: "legal", icon: Scale, color: "text-gray-600", slug: "legal" },
  {
    key: "hrTraining",
    icon: Users,
    color: "text-pink-600",
    slug: "hr-training",
  },
  {
    key: "engineeringArchitecture",
    icon: Building,
    color: "text-orange-600",
    slug: "engineering-architecture",
  },
  {
    key: "otherServices",
    icon: MoreHorizontal,
    color: "text-gray-500",
    slug: "other-services",
  },
  {
    key: "consultations",
    icon: MessageCircle,
    color: "text-blue-500",
    slug: "consultations",
  },
];

export default function Index() {
  const { currentLanguage, t } = useLanguage();
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const taskGate = useGate({
    actionName: "Post Task",
    onSuccess: () => {
      navigate(`/${currentLanguage}/create-task`);
    },
  });

  // Homepage implementation

  // Generate SEO metadata based on language
  const getSEOTitle = () => {
    switch (currentLanguage) {
      case "en":
        return "QuickHire – Hire Freelancers & Consultants in Estonia | QuickHire.ee";
      case "ru":
        return "QuickHire – Найти фрилансеров и консультантов в Эстонии | QuickHire.ee";
      default:
        return "QuickHire – Leia Eestis kiiresti vabakutselised ja konsultandid";
    }
  };

  const getSEODescription = () => {
    switch (currentLanguage) {
      case "en":
        return "Find freelancers, book consultations, or post tasks quickly and easily on QuickHire, Estonia's top freelance marketplace.";
      case "ru":
        return "Найдите фрилансеров, забронируйте консультации или разместите задачи быстро и легко на QuickHire - лучшем фриланс-маркетплейсе Эстонии.";
      default:
        return "Leia vabakutselisi, broneeri konsultatsioone või postita tööülesandeid QuickHire'is – Eesti kiireimas teenusturul.";
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={
          currentLanguage === "ru"
            ? "фрилансеры Эстония, консультанты Эстония, поставщики услуг, фриланс-рынок, QuickHire"
            : currentLanguage === "en"
              ? "freelancers Estonia, consultants Estonia, service providers, freelance marketplace, QuickHire"
              : "vabakutselised Eesti, konsultandid Eesti, teenusepakkujad, freelance turg, QuickHire"
        }
        url={`https://quickhire.ee/${currentLanguage}`}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* Floating orbs for modern feel */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-400/20 rounded-full blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.home.heroTitle}
            </h1>
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
              {t.home.heroSubtitle}
            </p>

            {/* Modern Light Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                to={`/${currentLanguage}/providers`}
                className="group relative bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-2xl hover:bg-white hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transform transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <User className="h-12 w-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-900">
                    {t.home.findTalent}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    {t.home.findTalentDesc}
                  </p>
                </div>
              </Link>

              <Link
                to={`/${currentLanguage}/consultations`}
                className="group relative bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-2xl hover:bg-white hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transform transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-teal-600 group-hover:scale-110 group-hover:text-teal-700 transition-all duration-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-teal-900">
                    {t.home.findConsultations}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    {t.home.findConsultationsDesc}
                  </p>
                </div>
              </Link>

              <button
                onClick={() => {
                  // Check current role from localStorage
                  const currentRole = localStorage.getItem(
                    "selected_account_type",
                  );
                  if (currentRole === "provider") {
                    // Provider trying to post task - show toast and offer role switch
                    toast({
                      title:
                        currentLanguage === "ru"
                          ? "Требуется клиентский аккаунт"
                          : currentLanguage === "en"
                            ? "Client account required"
                            : "Klientkonto on vajalik",
                      description:
                        currentLanguage === "ru"
                          ? "Для размещения задач нужен клиентский аккаунт. Переключитесь на клиента, чтобы продолжить."
                          : currentLanguage === "en"
                            ? "You need a client account to post tasks. Switch to client to continue."
                            : "Ülesannete postitamiseks on vajalik klientkonto. Lülituge klientiks, et jätkata.",
                      variant: "destructive",
                      action: (
                        <button
                          onClick={async () => {
                            try {
                              await switchRole("customer");
                              // After switching, navigate to create-task
                              navigate(`/${currentLanguage}/create-task`);
                            } catch (error) {
                              console.error(
                                "Failed to switch to client role:",
                                error,
                              );
                            }
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                        >
                          {currentLanguage === "ru"
                            ? "Переключиться на клиента"
                            : currentLanguage === "en"
                              ? "Switch to Client"
                              : "Lülitu klientiks"}
                        </button>
                      ),
                    });
                  } else {
                    // Client or no role - proceed with normal gate
                    taskGate.executeWithGate(() =>
                      navigate(`/${currentLanguage}/create-task`),
                    );
                  }
                }}
                className="group relative bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-2xl hover:bg-white hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 transform transition-all duration-300 w-full text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Edit className="h-12 w-12 mx-auto mb-4 text-green-600 group-hover:scale-110 group-hover:text-green-700 transition-all duration-300" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-green-900">
                    {t.home.postTask}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    {t.home.postTaskDesc}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.home.browseCategories}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categoryIcons.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={index}
                  to={`/${currentLanguage}/category/${category.slug}`}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-300 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 transition-all duration-300 group text-center transform"
                >
                  <div className="relative">
                    <IconComponent
                      className={`h-10 w-10 mx-auto mb-4 ${category.color} group-hover:scale-125 group-hover:rotate-3 transition-all duration-300`}
                    />
                    <div
                      className={`absolute inset-0 w-10 h-10 mx-auto rounded-full bg-gradient-to-br ${category.color.replace("text-", "from-").replace("-600", "-100")} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-900 transition-colors duration-300">
                    {t.categories[category.key as keyof typeof t.categories]}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.home.howItWorks}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.home.howItWorksSteps.step1Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.home.howItWorksSteps.step1Desc}
              </p>
              {/* Connector line for larger screens */}
              <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-8 w-32 h-0.5 bg-gradient-to-r from-blue-200 to-teal-200"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/25">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-teal-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.home.howItWorksSteps.step2Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.home.howItWorksSteps.step2Desc}
              </p>
              {/* Connector line for larger screens */}
              <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-8 w-32 h-0.5 bg-gradient-to-r from-teal-200 to-green-200"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/25">
                  <ThumbsUp className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t.home.howItWorksSteps.step3Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.home.howItWorksSteps.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Gate Modal */}
      <GateModal
        isOpen={taskGate.isGateOpen}
        onClose={taskGate.handleGateClose}
        onSuccess={taskGate.handleGateSuccess}
        actionName="Post Task"
      />
    </div>
  );
}
