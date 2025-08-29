import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useSubscription } from "../lib/SubscriptionContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import GatedPage from "../components/GatedPage";
import BookSessionModal from "../components/BookSessionModal";
import GateModal from "../components/GateModal";
import { useGate } from "../hooks/useGate";
import {
  Star,
  MapPin,
  Clock,
  Video,
  Calendar,
  ChevronRight,
  MessageCircle,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";

interface ConsultationExpert {
  id: number;
  name: string;
  title: string;
  photo: string;
  location: string;
  rating: number;
  reviews: number;
  responseRate: number;
  responseTime: string;
  bio: string;
  mainConsultation: string;
  price: number;
  duration: string;
  languages: string[];
  skills: string[];
  availability: string[];
  totalSessions: number;
  experience: string;
}

export default function ConsultationDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage, t } = useLanguage();
  const { user } = useAuth();
  const { isClientSubscribed, openSubscriptionModal } = useSubscription();
  const [expert, setExpert] = useState<ConsultationExpert | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const bookingGate = useGate({
    actionName: "Book Consultation",
    onSuccess: () => {
      setBookingModalOpen(true);
    },
  });

  // Single source of truth for role checks
  const isFreelance = user?.roles?.isFreelance === true;
  const isClient = user?.roles?.isClient === true;
  const finalIsClientSubscribed =
    isClient && user?.subscription?.status === "active";

  // Hard block: If user is freelance-only (no client subscription), show gated page
  if (user && isFreelance && !finalIsClientSubscribed) {
    return (
      <GatedPage
        intent="book-consultation"
        backPath={`/${currentLanguage}/consultations`}
      />
    );
  }

  // Soft block: If user is not authenticated or is client without subscription, show gated page
  if (!user || (isClient && !finalIsClientSubscribed)) {
    return (
      <GatedPage
        intent="book-consultation"
        backPath={`/${currentLanguage}/consultations`}
      />
    );
  }

  // Mock consultation data - in real app would fetch from API
  const getMockExpert = (expertId: string): ConsultationExpert | null => {
    const experts: { [key: string]: ConsultationExpert } = {
      "1": {
        id: 1,
        name: "Dr. Sarah Chen",
        title:
          currentLanguage === "ru"
            ? "Карьерный тренер и консультант по лидерству"
            : currentLanguage === "en"
              ? "Career Coach & Leadership Consultant"
              : "Karjääri treener ja juhtimiskonsultant",
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
        location:
          currentLanguage === "ru"
            ? "Таллин, Эстония"
            : currentLanguage === "en"
              ? "Tallinn, Estonia"
              : "Tallinn, Eesti",
        rating: 4.9,
        reviews: 127,
        responseRate: 100,
        responseTime:
          currentLanguage === "ru"
            ? "В течение 1 часа"
            : currentLanguage === "en"
              ? "Within 1 hour"
              : "1 tunni jooksul",
        bio:
          currentLanguage === "ru"
            ? "Опытный карьерный тренер с 10+ летним опытом помощи профессионалам в достижении их карьерных целей. Специализируюсь на развитии лидерских качеств, переходе в карьере и стратегическом планировании."
            : currentLanguage === "en"
              ? "Experienced career coach with 10+ years helping professionals achieve their career goals. I specialize in leadership development, career transitions, and strategic planning."
              : "Kogenud karjäärinõustaja 10+ aasta kogemusega professionaalide abistamisel nende karjäärieesmärkide saavutamisel. Spetsialiseerun juhtimisoskuste arendamisele, karjääriüleminekutele ja strateegilisele planeerimisele.",
        mainConsultation:
          currentLanguage === "ru"
            ? "Карьерное развитие и коучинг лидерства"
            : currentLanguage === "en"
              ? "Career Development & Leadership Coaching"
              : "Karjääri areng ja juhtimistreening",
        price: 150,
        duration: "60 min",
        languages:
          currentLanguage === "ru"
            ? ["Английский", "Эстонский", "Русский"]
            : currentLanguage === "en"
              ? ["English", "Estonian", "Russian"]
              : ["Inglise", "Eesti", "Vene"],
        skills:
          currentLanguage === "ru"
            ? [
                "Карьерное планирование",
                "Развитие лидерства",
                "Коучинг",
                "Управление командой",
              ]
            : currentLanguage === "en"
              ? [
                  "Career Planning",
                  "Leadership Development",
                  "Coaching",
                  "Team Management",
                ]
              : [
                  "Karjääri planeerimine",
                  "Juhtimise arendamine",
                  "Treening",
                  "Meeskonna juhtimine",
                ],
        availability:
          currentLanguage === "ru"
            ? ["Понедельник - Пятница", "9:00 - 17:00"]
            : currentLanguage === "en"
              ? ["Monday - Friday", "9:00 AM - 5:00 PM"]
              : ["Esmaspäev - Reede", "9:00 - 17:00"],
        totalSessions: 450,
        experience:
          currentLanguage === "ru"
            ? "10+ лет"
            : currentLanguage === "en"
              ? "10+ years"
              : "10+ aastat",
      },
      "2": {
        id: 2,
        name: "Elena Rodriguez",
        title:
          currentLanguage === "ru"
            ? "SEO специалист и маркетинговый стратег"
            : currentLanguage === "en"
              ? "SEO Specialist & Marketing Strategist"
              : "SEO spetsialist ja turundusstrateg",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        location:
          currentLanguage === "ru"
            ? "Тарту, Эстония"
            : currentLanguage === "en"
              ? "Tartu, Estonia"
              : "Tartu, Eesti",
        rating: 4.8,
        reviews: 89,
        responseRate: 98,
        responseTime:
          currentLanguage === "ru"
            ? "В течение 2 часов"
            : currentLanguage === "en"
              ? "Within 2 hours"
              : "2 tunni jooksul",
        bio:
          currentLanguage === "ru"
            ? "Специалист по SEO с 8-летним опытом помощи бизнесу в ул���чшении их онл��йн-присутствия. Экспертиза в техническом SEO, контент-стратегии и анализе данных."
            : currentLanguage === "en"
              ? "SEO specialist with 8 years of experience helping businesses improve their online presence. Expertise in technical SEO, content strategy, and data analytics."
              : "SEO spetsialist 8-aastase kogemusega ettevõtete veebikuuluvuse parandamisel. Ekspertiis tehnilises SEOs, sisustrateegiates ja andmeanalüüsis.",
        mainConsultation:
          currentLanguage === "ru"
            ? "SEO аудит и стратегия роста"
            : currentLanguage === "en"
              ? "SEO Audit & Growth Strategy"
              : "SEO audit ja kasvu strateegia",
        price: 200,
        duration: "90 min",
        languages:
          currentLanguage === "ru"
            ? ["Английский", "Испанский", "Эстонский"]
            : currentLanguage === "en"
              ? ["English", "Spanish", "Estonian"]
              : ["Inglise", "Hispaania", "Eesti"],
        skills:
          currentLanguage === "ru"
            ? [
                "SEO оптимизация",
                "Google Analytics",
                "Контент-маркетинг",
                "Технический аудит",
              ]
            : currentLanguage === "en"
              ? [
                  "SEO Optimization",
                  "Google Analytics",
                  "Content Marketing",
                  "Technical Auditing",
                ]
              : [
                  "SEO optimeerimine",
                  "Google Analytics",
                  "Sisturundus",
                  "Tehniline audit",
                ],
        availability:
          currentLanguage === "ru"
            ? ["Вторник - Суббота", "10:00 - 18:00"]
            : currentLanguage === "en"
              ? ["Tuesday - Saturday", "10:00 AM - 6:00 PM"]
              : ["Teisipäev - Laupäev", "10:00 - 18:00"],
        totalSessions: 320,
        experience:
          currentLanguage === "ru"
            ? "8 лет"
            : currentLanguage === "en"
              ? "8 years"
              : "8 aastat",
      },
      "6": {
        id: 6,
        name: "Lisa Wang",
        title:
          currentLanguage === "ru"
            ? "AI консультант и специалист по машинному обучению"
            : currentLanguage === "en"
              ? "AI Consultant & Machine Learning Specialist"
              : "AI konsultant ja masinõppe spetsialist",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        location:
          currentLanguage === "ru"
            ? "Таллин, Эстония"
            : currentLanguage === "en"
              ? "Tallinn, Estonia"
              : "Tallinn, Eesti",
        rating: 5.0,
        reviews: 45,
        responseRate: 100,
        responseTime:
          currentLanguage === "ru"
            ? "В течение 30 минут"
            : currentLanguage === "en"
              ? "Within 30 minutes"
              : "30 minuti jooksul",
        bio:
          currentLanguage === "ru"
            ? "Ведущий специалист по искусственному интеллекту с опытом внедрения AI решений в различных отраслях. Помогаю компаниям интегрировать ИИ для повышения эффективности бизнеса."
            : currentLanguage === "en"
              ? "Leading AI specialist with experience implementing AI solutions across various industries. I help companies integrate AI to boost business efficiency and innovation."
              : "Juhtiv AI spetsialist kogemusega AI lahenduste rakendamisel erinevates tööstusharudes. Aitan ettevõtetel integreerida AI-d äri efektiivsuse ja innovatsiooni suurendamiseks.",
        mainConsultation:
          currentLanguage === "ru"
            ? "Стратег��я внедрения ИИ"
            : currentLanguage === "en"
              ? "AI Implementation Strategy"
              : "AI rakendamise strateegia",
        price: 400,
        duration: "120 min",
        languages:
          currentLanguage === "ru"
            ? ["Английский", "Китайский", "Эстонский"]
            : currentLanguage === "en"
              ? ["English", "Mandarin", "Estonian"]
              : ["Inglise", "Hiina", "Eesti"],
        skills:
          currentLanguage === "ru"
            ? [
                "Машинное обучение",
                "Глубокое обучение",
                "Python",
                "TensorFlow",
                "AI стратегия",
              ]
            : currentLanguage === "en"
              ? [
                  "Machine Learning",
                  "Deep Learning",
                  "Python",
                  "TensorFlow",
                  "AI Strategy",
                ]
              : [
                  "Masinõpe",
                  "Süvaõpe",
                  "Python",
                  "TensorFlow",
                  "AI strateegia",
                ],
        availability:
          currentLanguage === "ru"
            ? ["Понедельник - Четверг", "14:00 - 20:00"]
            : currentLanguage === "en"
              ? ["Monday - Thursday", "2:00 PM - 8:00 PM"]
              : ["Esmaspäev - Neljapäev", "14:00 - 20:00"],
        totalSessions: 180,
        experience:
          currentLanguage === "ru"
            ? "12 лет"
            : currentLanguage === "en"
              ? "12 years"
              : "12 aastat",
      },
    };

    return experts[expertId] || null;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const expertData = getMockExpert(id);
        setExpert(expertData);
        setLoading(false);
      }, 500);
    }
  }, [id, currentLanguage]);

  const handleBookSession = () => {
    bookingGate.executeWithGate(() => setBookingModalOpen(true));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Консультация не найдена"
                : currentLanguage === "en"
                  ? "Consultation not found"
                  : "Konsultatsiooni ei leitud"}
            </h1>
            <Link
              to={`/${currentLanguage}/consultations`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {currentLanguage === "ru"
                ? "Вернуться к консультациям"
                : currentLanguage === "en"
                  ? "Back to consultations"
                  : "Tagasi konsultatsioonide juurde"}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Note: Subscription gating is now handled before component render

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${expert.mainConsultation} - ${expert.name} | QuickHire`}
        description={expert.bio}
        url={`https://quickhire.ee/${currentLanguage}/consultation/${expert.id}`}
      />

      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  to={`/${currentLanguage}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {currentLanguage === "ru"
                    ? "Главная"
                    : currentLanguage === "en"
                      ? "Home"
                      : "Avaleht"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link
                  to={`/${currentLanguage}/consultations`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {currentLanguage === "ru"
                    ? "Консультации"
                    : currentLanguage === "en"
                      ? "Consultations"
                      : "Konsultatsioonid"}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-900 font-medium">{expert.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expert Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={expert.photo}
                  alt={expert.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {expert.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-3">{expert.title}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {expert.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      {expert.rating} ({expert.reviews}{" "}
                      {currentLanguage === "ru"
                        ? "отзывов"
                        : currentLanguage === "en"
                          ? "reviews"
                          : "arvustust"}
                      )
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {expert.responseRate}%{" "}
                      {currentLanguage === "ru"
                        ? "ответов"
                        : currentLanguage === "en"
                          ? "response rate"
                          : "vastamise määr"}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {expert.responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "О консультанте"
                  : currentLanguage === "en"
                    ? "About the Consultant"
                    : "Konsultandi kohta"}
              </h2>
              <p className="text-gray-700 leading-relaxed">{expert.bio}</p>
            </div>

            {/* Skills & Languages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "Навыки и языки"
                  : currentLanguage === "en"
                    ? "Skills & Languages"
                    : "Oskused ja keeled"}
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {currentLanguage === "ru"
                      ? "Экспертиза"
                      : currentLanguage === "en"
                        ? "Expertise"
                        : "Ekspertiis"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {currentLanguage === "ru"
                      ? "Языки"
                      : currentLanguage === "en"
                        ? "Languages"
                        : "Keeled"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {expert.mainConsultation}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    €{expert.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    /{expert.duration}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Video className="h-4 w-4 mr-2" />
                  {currentLanguage === "ru"
                    ? "Видеозвонок"
                    : currentLanguage === "en"
                      ? "Video call"
                      : "Videokõne"}
                </div>
              </div>

              <button
                onClick={handleBookSession}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {currentLanguage === "ru"
                  ? "Забронировать сессию"
                  : currentLanguage === "en"
                    ? "Book Session"
                    : "Broneeri sessioon"}
              </button>

              <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                {currentLanguage === "ru"
                  ? "Связаться"
                  : currentLanguage === "en"
                    ? "Contact"
                    : "Võta ühendust"}
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "Статистика"
                  : currentLanguage === "en"
                    ? "Statistics"
                    : "Statistika"}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {currentLanguage === "ru"
                        ? "Всего сессий"
                        : currentLanguage === "en"
                          ? "Total sessions"
                          : "Kokku sessioone"}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {expert.totalSessions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {currentLanguage === "ru"
                        ? "Опыт"
                        : currentLanguage === "en"
                          ? "Experience"
                          : "Kogemus"}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {expert.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "Доступность"
                  : currentLanguage === "en"
                    ? "Availability"
                    : "Saadavus"}
              </h3>

              <div className="space-y-2">
                {expert.availability.map((time, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookSessionModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          consultation={{
            id: expert.id.toString(),
            title: expert.mainConsultation,
            description: expert.mainConsultation,
            duration: expert.duration,
            price: expert.price.toString(),
          }}
          provider={{
            id: expert.id.toString(),
            name: expert.name,
            photo: expert.photo,
          }}
          onBookingConfirmed={(booking) => {
            console.log("Booking confirmed:", booking);
            setBookingModalOpen(false);
          }}
        />
      )}

      {/* Gate Modal */}
      <GateModal
        isOpen={bookingGate.isGateOpen}
        onClose={bookingGate.handleGateClose}
        onSuccess={bookingGate.handleGateSuccess}
        actionName="Book Consultation"
      />
    </div>
  );
}
