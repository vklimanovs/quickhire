import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import SkillsTagInput, { Skill } from "../components/SkillsTagInput";
import { useLanguage } from "../lib/LanguageContext";
import { useSubscription } from "../lib/SubscriptionContext";
import GuardedAction from "../components/GuardedAction";
import { useDebouncedSearch } from "../hooks/useDebounce";
import {
  Search,
  Filter,
  Star,
  MapPin,
  X,
  MessageCircle,
  Check,
} from "lucide-react";

interface Provider {
  id: number;
  name: string;
  title: string;
  photo: string;
  bio: string;
  skills: string[];
  rating: number;
  reviews: number;
  location: string;
  category: string;
  primaryCategory?: string;
  secondaryCategories?: string[];
  offersConsultations: boolean;
  joinedDate: string;
  responseTime: string;
}

// TODO: Replace with actual API call to get providers
const getMockProviders = (t: any): Provider[] => [
  // Empty array - to be populated by actual API call
];

const categorySkills: Record<string, string[]> = {
  "development-it": [
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "GraphQL",
    "PostgreSQL",
    "Python",
    "SQL",
    "JavaScript",
    "PHP",
  ],
  "design-creative": [
    "Figma",
    "Adobe XD",
    "Prototüüpimine",
    "Kasutajauuringud",
    "UI/UX",
    "Branding",
    "Illustrator",
    "Photoshop",
  ],
  "ai-services": [
    "AI/ML",
    "Python",
    "TensorFlow",
    "Arvutinägemine",
    "NLP",
    "Deep Learning",
    "PyTorch",
    "Keras",
  ],
  "sales-marketing": [
    "SEO",
    "Google Ads",
    "Analüütika",
    "Sisu strateegia",
    "Facebook Ads",
    "Email turundus",
    "CRM",
    "HubSpot",
  ],
  "writing-translation": [
    "Tekstikirjutamine",
    "Ajaveeb",
    "Tehniline kirjutamine",
    "SEO kirjutamine",
    "Sisuturundus",
    "Koopikirjutamine",
  ],
  consultations: [
    "Strateegia",
    "Operatsioonid",
    "Rahandus",
    "Juhtimine",
    "Ärianalüüs",
    "Projekti juhtimine",
  ],
  "finance-accounting": [
    "Finantplaneerimine",
    "Investeerimine",
    "Maksu strateegia",
    "Ärirahastus",
    "Riskijuhtimine",
    "Raamatupidamine",
  ],
};

export default function BrowseProviders() {
  const { currentLanguage, t } = useLanguage();
  const { isClientSubscribed, openSubscriptionModal } = useSubscription();
  const mockProviders = getMockProviders(t);
  const { searchInput, setSearchInput, debouncedSearchTerm } =
    useDebouncedSearch("", 250);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [consultationsOnly, setConsultationsOnly] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  // Get available skills based on selected category
  const availableSkills = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") {
      // Return all unique skills if no category selected
      const allSkills = new Set<string>();
      Object.values(categorySkills).forEach((skills) => {
        skills.forEach((skill) => allSkills.add(skill));
      });
      return Array.from(allSkills).sort();
    }
    return categorySkills[selectedCategory] || [];
  }, [selectedCategory]);

  // Filter providers based on search and filters
  const filteredProviders = useMemo(() => {
    return mockProviders.filter((provider) => {
      // Search filter - using debounced search term
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        const matchesSearch =
          provider.name.toLowerCase().includes(searchLower) ||
          provider.title.toLowerCase().includes(searchLower) ||
          provider.bio.toLowerCase().includes(searchLower) ||
          provider.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower),
          );

        if (!matchesSearch) return false;
      }

      // Category filter - check primary category, secondary categories, and legacy category field
      if (selectedCategory && selectedCategory !== "all") {
        const matchesPrimary = provider.primaryCategory === selectedCategory;
        const matchesSecondary =
          provider.secondaryCategories?.includes(selectedCategory);
        const matchesLegacy = provider.category === selectedCategory;

        if (!matchesPrimary && !matchesSecondary && !matchesLegacy) {
          return false;
        }
      }

      // Rating filter
      if (selectedRating) {
        const minRating = parseFloat(selectedRating);
        if (provider.rating < minRating) return false;
      }

      // Consultations filter
      if (consultationsOnly && !provider.offersConsultations) {
        return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasMatchingSkill = selectedSkills.some((selectedSkill) =>
          provider.skills.some(
            (providerSkill) =>
              providerSkill.toLowerCase() === selectedSkill.name.toLowerCase(),
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
    consultationsOnly,
    selectedSkills,
  ]);

  const clearFilters = () => {
    setSearchInput("");
    setSelectedCategory("");
    setSelectedRating("");
    setConsultationsOnly(false);
    setSelectedSkills([]);
  };

  const hasActiveFilters =
    searchInput ||
    selectedCategory ||
    selectedRating ||
    consultationsOnly ||
    selectedSkills.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${t.providers.title} | QuickHire.ee`}
        description={t.providers.subtitle}
        keywords={
          currentLanguage === "ru"
            ? "поставщики услуг Эстония, ��пытны�� эксперты, фриланс-услуги, разработчики дизайнеры"
            : currentLanguage === "en"
              ? "service providers Estonia, skilled experts, freelance services, developers designers"
              : "teenusepakkujad Eesti, oskuslikud eksperdid, freelance teenused, arendajad disainerid"
        }
        url={`https://quickhire.ee/${currentLanguage}/providers`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.providers.title}
          </h1>
          <p className="text-lg text-gray-600">{t.providers.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  {t.common.filter}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
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
                    placeholder={t.providers.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.providers.allCategories}</option>
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
                  <option value="consultations">
                    {t.categories.consultations}
                  </option>
                </select>
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

              {/* Consultations Filter */}
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
                    {t.providers.offersConsultations}
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
                  placeholder={t.providers.skillsPlaceholder}
                  chipStyle="minimal"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredProviders.length === 0
                  ? t.providers.noResults
                  : `${t.providers.showingResults} ${filteredProviders.length} ${filteredProviders.length === 1 ? t.common.expertSingular : t.common.expertPlural}`}
              </p>
            </div>

            {/* No Results */}
            {filteredProviders.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.providers.noResults}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedSkills.length > 0
                      ? t.providers.noResultsSkills
                      : t.providers.noResultsDesc}
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

            {/* Provider Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  {/* Provider Header */}
                  <div className="flex items-center mb-4">
                    <img
                      src={provider.photo}
                      alt={provider.name}
                      className="h-16 w-16 rounded-full object-cover mr-4 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {provider.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {provider.title}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {provider.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {provider.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {provider.skills.length > 4 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{provider.skills.length - 4} {t.common.more}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </div>

                  {/* Rating and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {provider.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({provider.reviews})
                      </span>
                    </div>
                    <GuardedAction
                      isAllowed={isClientSubscribed}
                      onRestricted={() => openSubscriptionModal("view-profile")}
                      intent="view-profile"
                      showLockIcon={true}
                    >
                      <Link
                        to={`/${currentLanguage}/provider/${provider.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {t.providers.viewProfile}
                      </Link>
                    </GuardedAction>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredProviders.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.providers.loadMore}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
