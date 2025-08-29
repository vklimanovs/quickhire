import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import SkillsTagInput, { Skill } from "../components/SkillsTagInput";
import { useLanguage } from "../lib/LanguageContext";
import { useDebouncedSearch } from "../hooks/useDebounce";
import { useSubscription } from "../lib/SubscriptionContext";
import GuardedAction from "../components/GuardedAction";
import {
  Search,
  Filter,
  Star,
  MapPin,
  X,
  MessageCircle,
  Check,
  Video,
  Clock,
  Calendar,
} from "lucide-react";

interface Expert {
  id: number;
  name: string;
  title: string;
  photo: string;
  bio: string;
  mainConsultation: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  offersVideoCall: boolean;
  skills: string[];
  languages: string[];
  joinedDate: string;
  responseTime: string;
}

// TODO: Replace with actual API call to get consultations
const getMockExperts = (t: any): Expert[] => [];

// Skill translation mapping
const getSkillTranslations = (language: string) => {
  const skillMaps: Record<string, Record<string, string>> = {
    et: {
      "Career Planning": "Karjääri planeerimine",
      "Leadership Development": "Juhtimise arendamine",
      "Job Search": "Töö otsimine",
      "Interview Training": "Intervjuu treening",
      "Team Building": "Meeskonna ehitamine",
      Coaching: "Juhendamine",
      SEO: "SEO",
      "Google Ads": "Google Ads",
      "Content Marketing": "Sisuturundus",
      Analytics: "Analüütika",
      "Content Strategy": "Sisu strateegia",
      "Facebook Ads": "Facebook Ads",
      "Email Marketing": "Email turundus",
      "Tech Management": "Tehnoloogia juhtimine",
      Agile: "Agile",
      "Project Management": "Projekti juhtimine",
      "Machine Learning": "Masinõpe",
      TensorFlow: "TensorFlow",
      "Power BI": "Power BI",
      "Financial Planning": "Finantplaneerimine",
      Investment: "Investeerimine",
      "Tax Strategy": "Maksu strateegia",
      "Business Finance": "Ärirahastus",
      "Risk Management": "Riskijuhtimine",
      Accounting: "Raamatupidamine",
      "Portfolio Management": "Portfelli haldus",
      "AI/ML": "AI/ML",
      "Computer Vision": "Arvutinägemine",
      "Data Analysis": "Andmeanalüüs",
      Automation: "Automatiseerimine",
      "UI/UX": "UI/UX",
      Prototyping: "Prototüüpimine",
      "User Research": "Kasutajauuringud",
      Branding: "Branding",
      "Content Writing": "Sisuloomine",
      Copywriting: "Reklaamtekstide kirjutamine",
      Translation: "Tõlkimine",
      "Technical Writing": "Tehniline kirjutamine",
      "Blog Writing": "Blogi kirjutamine",
      "Social Media Content": "Sotsiaalmeedia sisu",
      "Virtual Assistant": "Virtuaalne assistent",
      "Data Entry": "Andmesisestus",
      "Customer Support": "Klienditeenus",
      "Administrative Support": "Halduslik tugi",
      "Email Management": "E-kirjade haldus",
      "Calendar Management": "Kalendri haldus",
      "Legal Advice": "Õigusnõustamine",
      "Contract Review": "Lepingute läbivaatus",
      "Business Law": "Äriõigus",
      "Intellectual Property": "Intellektuaalomand",
      "Employment Law": "Tööõigus",
      Compliance: "Vastavus",
      "Structural Engineering": "Konstruktsiooniinseneeria",
      "Architecture Design": "Arhitektuur",
      CAD: "CAD",
      "Project Engineering": "Projektiinseneeria",
      "Construction Management": "Ehituse juhtimine",
      "Building Design": "Hoone disain",
      Consulting: "Konsulteerimine",
      "Business Strategy": "Äristrateegia",
      "Market Research": "Turu-uuringud",
      "Process Improvement": "Protsessi parendamine",
      "General Advisory": "Üldine nõustamine",
      "Problem Solving": "Probleemide lahendamine",
    },
    en: {
      "Career Planning": "Career Planning",
      "Leadership Development": "Leadership Development",
      "Job Search": "Job Search",
      "Interview Training": "Interview Training",
      "Team Building": "Team Building",
      Coaching: "Coaching",
      SEO: "SEO",
      "Google Ads": "Google Ads",
      "Content Marketing": "Content Marketing",
      Analytics: "Analytics",
      "Content Strategy": "Content Strategy",
      "Facebook Ads": "Facebook Ads",
      "Email Marketing": "Email Marketing",
      "Tech Management": "Tech Management",
      Agile: "Agile",
      "Project Management": "Project Management",
      "Machine Learning": "Machine Learning",
      TensorFlow: "TensorFlow",
      "Power BI": "Power BI",
      "Financial Planning": "Financial Planning",
      Investment: "Investment",
      "Tax Strategy": "Tax Strategy",
      "Business Finance": "Business Finance",
      "Risk Management": "Risk Management",
      Accounting: "Accounting",
      "Portfolio Management": "Portfolio Management",
      "AI/ML": "AI/ML",
      "Computer Vision": "Computer Vision",
      "Data Analysis": "Data Analysis",
      Automation: "Automation",
      "UI/UX": "UI/UX",
      Prototyping: "Prototyping",
      "User Research": "User Research",
      Branding: "Branding",
      "Content Writing": "Content Writing",
      Copywriting: "Copywriting",
      Translation: "Translation",
      "Technical Writing": "Technical Writing",
      "Blog Writing": "Blog Writing",
      "Social Media Content": "Social Media Content",
      "Virtual Assistant": "Virtual Assistant",
      "Data Entry": "Data Entry",
      "Customer Support": "Customer Support",
      "Administrative Support": "Administrative Support",
      "Email Management": "Email Management",
      "Calendar Management": "Calendar Management",
      "Legal Advice": "Legal Advice",
      "Contract Review": "Contract Review",
      "Business Law": "Business Law",
      "Intellectual Property": "Intellectual Property",
      "Employment Law": "Employment Law",
      Compliance: "Compliance",
      "Structural Engineering": "Structural Engineering",
      "Architecture Design": "Architecture Design",
      CAD: "CAD",
      "Project Engineering": "Project Engineering",
      "Construction Management": "Construction Management",
      "Building Design": "Building Design",
      Consulting: "Consulting",
      "Business Strategy": "Business Strategy",
      "Market Research": "Market Research",
      "Process Improvement": "Process Improvement",
      "General Advisory": "General Advisory",
      "Problem Solving": "Problem Solving",
    },
    ru: {
      "Career Planning": "П��анировани�� карьеры",
      "Leadership Development": "Развитие лидерства",
      "Job Search": "Пои��к работы",
      "Interview Training": "Тренинг по ��обеседованиям",
      "Team Building": "Создание команды",
      Coaching: "Коучинг",
      SEO: "SEO",
      "Google Ads": "Google Ads",
      "Content Marketing": "Контент-маркетинг",
      Analytics: "Аналитика",
      "Content Strategy": "Контент-стратегия",
      "Facebook Ads": "Facebook Ads",
      "Email Marketing": "Email-маркетинг",
      "Tech Management": "Управление технологиями",
      Agile: "Agile",
      "Project Management": "Управление ��роектами",
      "Machine Learning": "Машинное обучен��е",
      TensorFlow: "TensorFlow",
      "Power BI": "Power BI",
      "Financial Planning": "Финансовое планирование",
      Investment: "Инвестирование",
      "Tax Strategy": "Налоговая стратегия",
      "Business Finance": "Бизнес-финансы",
      "Risk Management": "Управление рис��ами",
      Accounting: "Бухгалтерия",
      "Portfolio Management": "Управление портфелем",
      "AI/ML": "AI/ML",
      "Computer Vision": "Компь��терное зрение",
      "Data Analysis": "Анализ данных",
      Automation: "Автоматизация",
      "UI/UX": "UI/UX",
      Prototyping: "��рототипирование",
      "User Research": "Пользовательские исследования",
      Branding: "Брендинг",
      "Content Writing": "Создание контента",
      Copywriting: "Копирайтинг",
      Translation: "Перевод",
      "Technical Writing": "Техническо�� письмо",
      "Blog Writing": "Написание блогов",
      "Social Media Content": "Контент ��ля соцсетей",
      "Virtual Assistant": "Вирту��льный асси����тент",
      "Data Entry": "Ввод данных",
      "Customer Support": "Поддержка кли��нтов",
      "Administrative Support": "Административная поддержка",
      "Email Management": "Управление электронной почтой",
      "Calendar Management": "Управление календарем",
      "Legal Advice": "Юридические консу��ьтации",
      "Contract Review": "Проверка договоров",
      "Business Law": "Бизнес-право",
      "Intellectual Property": "Интеллектуальная собственность",
      "Employment Law": "Трудовое право",
      Compliance: "Соответствие",
      "Structural Engineering": "Структурная инженерия",
      "Architecture Design": "��р��итектурный дизайн",
      CAD: "CAD",
      "Project Engineering": "Проектная инженерия",
      "Construction Management": "Управление строительством",
      "Building Design": "Дизайн зданий",
      Consulting: "Консультирование",
      "Business Strategy": "Биз��ес-стратегия",
      "Market Research": "Исследование рынка",
      "Process Improvement": "Улучшение ��роцессов",
      "General Advisory": "Общие консультации",
      "Problem Solving": "Решение проблем",
    },
  };
  return skillMaps[language] || skillMaps["et"];
};

const categorySkills: Record<string, string[]> = {
  "development-it": [
    "Tech Management",
    "Team Building",
    "Agile",
    "Project Management",
    "Machine Learning",
    "Analytics",
    "TensorFlow",
    "Power BI",
  ],
  "design-creative": ["UI/UX", "Prototyping", "User Research", "Branding"],
  "ai-services": ["AI/ML", "Computer Vision", "Data Analysis", "Automation"],
  "sales-marketing": [
    "SEO",
    "Google Ads",
    "Content Marketing",
    "Analytics",
    "Content Strategy",
    "Facebook Ads",
    "Email Marketing",
  ],
  "writing-translation": [
    "Content Writing",
    "Copywriting",
    "Translation",
    "Technical Writing",
    "Blog Writing",
    "Social Media Content",
  ],
  "admin-support": [
    "Virtual Assistant",
    "Data Entry",
    "Customer Support",
    "Administrative Support",
    "Email Management",
    "Calendar Management",
  ],
  "finance-accounting": [
    "Financial Planning",
    "Investment",
    "Tax Strategy",
    "Business Finance",
    "Risk Management",
    "Accounting",
    "Portfolio Management",
  ],
  legal: [
    "Legal Advice",
    "Contract Review",
    "Business Law",
    "Intellectual Property",
    "Employment Law",
    "Compliance",
  ],
  "hr-training": [
    "Career Planning",
    "Leadership Development",
    "Job Search",
    "Interview Training",
    "Team Building",
    "Coaching",
  ],
  "engineering-architecture": [
    "Structural Engineering",
    "Architecture Design",
    "CAD",
    "Project Engineering",
    "Construction Management",
    "Building Design",
  ],
  "other-services": [
    "Consulting",
    "Business Strategy",
    "Market Research",
    "Process Improvement",
    "General Advisory",
    "Problem Solving",
  ],
};

export default function BrowseConsultations() {
  const { currentLanguage, t } = useLanguage();
  const { isClientSubscribed, openSubscriptionModal } = useSubscription();
  const mockExperts = getMockExperts(t);
  const { searchInput, setSearchInput, debouncedSearchTerm } =
    useDebouncedSearch("", 250);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [videoCallOnly, setVideoCallOnly] = useState(false);
  const [consultationsOnly, setConsultationsOnly] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get available skills based on selected category (translated)
  const availableSkills = useMemo(() => {
    const skillTranslations = getSkillTranslations(currentLanguage);
    let skills: string[] = [];

    if (!selectedCategory || selectedCategory === "all") {
      // Return all unique skills if no category selected
      const allSkills = new Set<string>();
      Object.values(categorySkills).forEach((categorySkillsList) => {
        categorySkillsList.forEach((skill) => allSkills.add(skill));
      });
      skills = Array.from(allSkills);
    } else {
      skills = categorySkills[selectedCategory] || [];
    }

    // Translate skills to current language
    return skills.map((skill) => skillTranslations[skill] || skill).sort();
  }, [selectedCategory, currentLanguage]);

  // Filter experts based on search and filters
  const filteredExperts = useMemo(() => {
    return mockExperts.filter((expert) => {
      // Search filter - using debounced search term
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        const matchesSearch =
          expert.name.toLowerCase().includes(searchLower) ||
          expert.title.toLowerCase().includes(searchLower) ||
          expert.bio.toLowerCase().includes(searchLower) ||
          expert.mainConsultation.toLowerCase().includes(searchLower) ||
          expert.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower),
          );

        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (expert.category !== selectedCategory) return false;
      }

      // Rating filter
      if (selectedRating) {
        const minRating = parseFloat(selectedRating);
        if (expert.rating < minRating) return false;
      }

      // Price filter
      if (priceMin && expert.price < parseInt(priceMin)) return false;
      if (priceMax && expert.price > parseInt(priceMax)) return false;

      // Video call filter
      if (videoCallOnly && !expert.offersVideoCall) {
        return false;
      }

      // Consultations only filter (redundant on this page but for consistency)
      if (consultationsOnly) {
        // All experts on this page offer consultations, so always pass
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const skillTranslations = getSkillTranslations(currentLanguage);
        // Reverse lookup: find English key for translated skill
        const englishSkills = selectedSkills.map((selectedSkill) => {
          const englishKey = Object.entries(skillTranslations).find(
            ([, translation]) => translation === selectedSkill.name,
          )?.[0];
          return englishKey || selectedSkill.name;
        });

        const hasMatchingSkill = englishSkills.some((skill) =>
          expert.skills.some(
            (expertSkill) => expertSkill.toLowerCase() === skill.toLowerCase(),
          ),
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedRating,
    videoCallOnly,
    selectedSkills,
    mockExperts,
  ]);

  const clearFilters = () => {
    setSearchInput("");
    setSelectedCategory("");
    setSelectedRating("");
    setPriceMin("");
    setPriceMax("");
    setVideoCallOnly(false);
    setSelectedSkills([]);
  };

  const hasActiveFilters =
    searchInput ||
    selectedCategory ||
    selectedRating ||
    priceMin ||
    priceMax ||
    videoCallOnly ||
    selectedSkills.length > 0;

  const getSEOTitle = () => {
    switch (currentLanguage) {
      case "en":
        return "Browse Expert Consultations | QuickHire.ee";
      case "ru":
        return "Консультаци�� эксперт��в | QuickHire.ee";
      default:
        return "Sirvi ekspertkonsultatsioone | QuickHire.ee";
    }
  };

  const getSEODescription = () => {
    switch (currentLanguage) {
      case "en":
        return "Book one-on-one sessions with industry experts and get personalized advice on QuickHire.";
      case "ru":
        return "Забр��нируйте индив��дуальные сес��ии с экспертами отрасли и получите персональные ��оветы на QuickHire.";
      default:
        return "Broneeri ��kshaaval sessioonid tööstuse ekspertidega ja saa personaalset nõu QuickHire'is.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={
          currentLanguage === "ru"
            ? "экспертные консультации, профессиональные консультации, бизнес-консультации Эстония"
            : currentLanguage === "en"
              ? "expert consultations, professional consulting, business consultations Estonia"
              : "ekspert konsultatsioonid, professionaalne nõustamine, ärikonsultatsioonid Eesti"
        }
        url={`https://quickhire.ee/${currentLanguage}/consultations`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.consultations.title}
          </h1>
          <p className="text-lg text-gray-600">{t.consultations.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {t.common.filter}
              {hasActiveFilters && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {(selectedCategory ? 1 : 0) +
                    (selectedRating ? 1 : 0) +
                    (priceMin || priceMax ? 1 : 0) +
                    (videoCallOnly ? 1 : 0) +
                    selectedSkills.length}
                </span>
              )}
            </button>
          </div>

          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  {t.common.filter}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {t.providers.clearFilters}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.common.search}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={t.consultations.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nav.categories}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.consultations.allCategories}</option>
                  <option value="development-it">
                    {t.categories.developmentIt}
                  </option>
                  <option value="design-creative">
                    {t.categories.designCreative}
                  </option>
                  <option value="ai-services">{t.categories.aiServices}</option>
                  <option value="sales-marketing">
                    {t.categories.salesMarketing}
                  </option>
                  <option value="writing-translation">
                    {t.categories.writingTranslation}
                  </option>
                  <option value="admin-support">
                    {t.categories.adminSupport}
                  </option>
                  <option value="finance-accounting">
                    {t.categories.financeAccounting}
                  </option>
                  <option value="legal">{t.categories.legal}</option>
                  <option value="hr-training">{t.categories.hrTraining}</option>
                  <option value="engineering-architecture">
                    {t.categories.engineeringArchitecture}
                  </option>
                  <option value="other-services">
                    {t.categories.otherServices}
                  </option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.consultations.priceRange}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="Min €"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="Max ��"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterByRating}
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.providers.rating.all}</option>
                  <option value="5">{t.providers.rating.fiveStars}</option>
                  <option value="4">{t.providers.rating.fourPlus}</option>
                  <option value="3">{t.providers.rating.threePlus}</option>
                </select>
              </div>

              {/* Video Call Filter */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoCallOnly}
                    onChange={(e) => setVideoCallOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${videoCallOnly ? "bg-blue-600 border-blue-600" : "border-gray-300"} mr-3 flex items-center justify-center`}
                  >
                    {videoCallOnly && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {t.consultations.videoCall}
                  </span>
                </label>
              </div>

              {/* Consultation Providers Only Filter */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consultationsOnly}
                    onChange={(e) => setConsultationsOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${consultationsOnly ? "bg-blue-600 border-blue-600" : "border-gray-300"} mr-3 flex items-center justify-center`}
                  >
                    {consultationsOnly && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {currentLanguage === "ru"
                      ? "Только консультанты"
                      : currentLanguage === "en"
                        ? "Only consultation providers"
                        : "Ainult konsultatsioonipakkujad"}
                  </span>
                </label>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterBySkills}
                </label>
                <SkillsTagInput
                  selectedSkills={selectedSkills}
                  onSkillsChange={setSelectedSkills}
                  availableSkills={availableSkills}
                  placeholder={t.consultations.searchPlaceholder}
                  chipStyle="branded"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredExperts.length === 0
                  ? t.consultations.noResults
                  : `${filteredExperts.length} ${filteredExperts.length === 1 ? t.consultations.consultationAvailable : t.consultations.consultationsAvailable}`}
              </p>
            </div>

            {/* No Results */}
            {filteredExperts.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.consultations.noResults}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t.consultations.noResultsFilter}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    {t.providers.clearFilters}
                  </button>
                </div>
              </div>
            )}

            {/* Expert Grid - Matching Provider cards exactly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  {/* Expert Header */}
                  <div className="flex items-center mb-4">
                    <img
                      src={expert.photo}
                      alt={expert.name}
                      className="h-16 w-16 rounded-full object-cover mr-4 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {expert.name}
                        </h3>
                        {expert.offersVideoCall && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-teal-100 text-teal-800">
                            <Video className="h-3 w-3 mr-1" />
                            {t.consultations.videoCall}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {expert.title}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {expert.bio}
                  </p>

                  {/* Consultation Price & Duration */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          €{expert.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">
                          /{t.consultations.perSession}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{expert.duration}min</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {expert.skills.slice(0, 4).map((skill, index) => {
                      const skillTranslations =
                        getSkillTranslations(currentLanguage);
                      const translatedSkill = skillTranslations[skill] || skill;
                      return (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {translatedSkill}
                        </span>
                      );
                    })}
                    {expert.skills.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{expert.skills.length - 4} {t.common.more}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {expert.location}
                  </div>

                  {/* Rating and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {expert.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({expert.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Quick Book - only show if single clear session type */}
                      <GuardedAction
                        isAllowed={isClientSubscribed}
                        onRestricted={() =>
                          openSubscriptionModal("book-consultation")
                        }
                        intent="book-consultation"
                        showLockIcon={true}
                      >
                        <Link
                          to={`/${currentLanguage}/consultation/${expert.id}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          {currentLanguage === "ru"
                            ? "Быстрое бронирование"
                            : currentLanguage === "en"
                              ? "Quick Book"
                              : "Kiire broneering"}
                        </Link>
                      </GuardedAction>

                      {/* View Profile - always show as primary */}
                      <GuardedAction
                        isAllowed={isClientSubscribed}
                        onRestricted={() =>
                          openSubscriptionModal("view-profile")
                        }
                        intent="view-profile"
                        showLockIcon={true}
                      >
                        <Link
                          to={`/${currentLanguage}/consultation/${expert.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          {t.consultations.viewProfile}
                        </Link>
                      </GuardedAction>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredExperts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.consultations.loadMore}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {t.common.filter}
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.common.search}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={t.consultations.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nav.categories}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.consultations.allCategories}</option>
                  <option value="development-it">
                    {t.categories.developmentIt}
                  </option>
                  <option value="design-creative">
                    {t.categories.designCreative}
                  </option>
                  <option value="ai-services">{t.categories.aiServices}</option>
                  <option value="sales-marketing">
                    {t.categories.salesMarketing}
                  </option>
                  <option value="writing-translation">
                    {t.categories.writingTranslation}
                  </option>
                  <option value="admin-support">
                    {t.categories.adminSupport}
                  </option>
                  <option value="finance-accounting">
                    {t.categories.financeAccounting}
                  </option>
                  <option value="legal">{t.categories.legal}</option>
                  <option value="hr-training">{t.categories.hrTraining}</option>
                  <option value="engineering-architecture">
                    {t.categories.engineeringArchitecture}
                  </option>
                  <option value="other-services">
                    {t.categories.otherServices}
                  </option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.consultations.priceRange}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="Min €"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="Max €"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterByRating}
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.providers.rating.all}</option>
                  <option value="5">{t.providers.rating.fiveStars}</option>
                  <option value="4">{t.providers.rating.fourPlus}</option>
                  <option value="3">{t.providers.rating.threePlus}</option>
                </select>
              </div>

              {/* Video Call Filter */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoCallOnly}
                    onChange={(e) => setVideoCallOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded ${videoCallOnly ? "bg-blue-600 border-blue-600" : "border-gray-300"} mr-3 flex items-center justify-center`}
                  >
                    {videoCallOnly && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {t.consultations.videoCall}
                  </span>
                </label>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterBySkills}
                </label>
                <SkillsTagInput
                  selectedSkills={selectedSkills}
                  onSkillsChange={setSelectedSkills}
                  availableSkills={availableSkills}
                  placeholder={t.consultations.searchPlaceholder}
                  chipStyle="branded"
                />
              </div>
            </div>

            {/* Footer with Apply/Reset buttons */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {t.providers.clearFilters}
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  {currentLanguage === "ru"
                    ? "Применить"
                    : currentLanguage === "en"
                      ? "Apply"
                      : "Rakenda"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
