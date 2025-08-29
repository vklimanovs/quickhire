import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useSubscription } from "../lib/SubscriptionContext";
import GuardedAction from "../components/GuardedAction";
import SkillsAutocomplete from "../components/SkillsAutocomplete";
import { useDebounce } from "../hooks/useDebounce";
import { useUrlFilters } from "../hooks/useUrlFilters";
import { Search, Filter, Star, MapPin, ArrowLeft } from "lucide-react";

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
  status?: "available" | "busy" | "inactive";
}

// TODO: Replace with actual API call to get providers by category
const getMockProviders = (t: any): Provider[] => [];

// Category mapping for display (URL slug -> Display name)
const CATEGORY_MAPPING: Record<string, string> = {
  "development-it": "Development & IT",
  "design-creative": "Design & Creative",
  "ai-services": "AI Services",
  "sales-marketing": "Sales & Marketing",
  "writing-translation": "Writing & Translation",
  "admin-support": "Admin & Support",
  "finance-accounting": "Finance & Accounting",
  legal: "Legal",
  "hr-training": "HR & Training",
  "engineering-architecture": "Engineering & Architecture",
  "other-services": "Other Services",
  consultations: "Consultations",
};

// Legacy category mapping (for backward compatibility)
const LEGACY_CATEGORY_MAPPING: Record<string, string> = {
  "development-it": "development-it",
  "design-creative": "design-creative",
  "ai-services": "ai-services",
  "sales-marketing": "sales-marketing",
  "writing-translation": "writing-translation",
  "admin-support": "admin-support",
  "finance-accounting": "finance-accounting",
  legal: "legal",
  "hr-training": "hr-training",
  "engineering-architecture": "engineering-architecture",
  "other-services": "other-services",
};

export default function CategoryPage() {
  const { categoryName = "" } = useParams<{ categoryName: string }>();
  const { currentLanguage, t } = useLanguage();
  const { hasActiveSubscription, isClientSubscribed, openSubscriptionModal } =
    useSubscription();

  // Convert URL parameter to display name
  const categoryDisplayName =
    CATEGORY_MAPPING[categoryName] ||
    categoryName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Filter states with URL persistence
  const urlFilters = useUrlFilters({
    status: "all",
    consultations: false,
    skills: [],
  });

  // Debounced search for immediate UI feedback - initialize from URL
  const [searchInput, setSearchInput] = useState(
    urlFilters.filters.search || "",
  );
  const debouncedSearchTerm = useDebounce(searchInput, 250);

  // Update URL when debounced search changes
  useEffect(() => {
    urlFilters.updateFilter("search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Sync search input when URL changes (back/forward navigation)
  useEffect(() => {
    if (urlFilters.filters.search !== searchInput) {
      setSearchInput(urlFilters.filters.search || "");
    }
  }, [urlFilters.filters.search]);

  const mockProviders = getMockProviders(t);

  // Filter providers by the selected category (primary or secondary)
  const filteredProviders = useMemo(() => {
    return mockProviders.filter((provider) => {
      // Category filter - check if provider matches the URL category
      const matchesPrimary = provider.primaryCategory === categoryDisplayName;
      const matchesSecondary =
        provider.secondaryCategories?.includes(categoryDisplayName);
      const matchesLegacy =
        provider.category === categoryName ||
        provider.category === LEGACY_CATEGORY_MAPPING[categoryName];

      if (!matchesPrimary && !matchesSecondary && !matchesLegacy) {
        return false;
      }

      // Search filter - using URL search term for consistency
      if (urlFilters.filters.search?.trim()) {
        const searchLower = urlFilters.filters.search.toLowerCase();
        const matchesSearch =
          provider.name.toLowerCase().includes(searchLower) ||
          provider.title.toLowerCase().includes(searchLower) ||
          provider.bio.toLowerCase().includes(searchLower) ||
          provider.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower),
          );

        if (!matchesSearch) return false;
      }

      // Rating filter
      if (urlFilters.filters.rating) {
        const minRating = parseFloat(urlFilters.filters.rating);
        if (provider.rating < minRating) return false;
      }

      // Consultations filter
      if (urlFilters.filters.consultations && !provider.offersConsultations) {
        return false;
      }

      // Status filter
      if (
        urlFilters.filters.status === "available" &&
        provider.status !== "available"
      ) {
        return false;
      }

      // Skills filter
      if (urlFilters.filters.skills && urlFilters.filters.skills.length > 0) {
        const hasMatchingSkill = urlFilters.filters.skills.some((skill) =>
          provider.skills.includes(skill),
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [
    urlFilters.filters.search,
    urlFilters.filters.rating,
    urlFilters.filters.consultations,
    urlFilters.filters.skills,
    urlFilters.filters.status,
    categoryDisplayName,
    categoryName,
    mockProviders,
  ]);

  const clearFilters = () => {
    setSearchInput("");
    urlFilters.clearFilters();
  };

  const hasActiveFilters = searchInput || urlFilters.hasActiveFilters;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${categoryDisplayName} Freelancers | QuickHire.ee`}
        description={`Find skilled ${categoryDisplayName} freelancers on QuickHire.ee`}
        keywords={`${categoryDisplayName}, freelancers, experts, Estonia`}
        url={`https://quickhire.ee/${currentLanguage}/category/${categoryName}`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/${currentLanguage}/providers`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.back}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryDisplayName}{" "}
            {t.providers.title?.includes("Browse")
              ? "Freelancers"
              : "Specialists"}
          </h1>
          <p className="text-gray-600">
            Find skilled {categoryDisplayName} experts for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {t.providers.filterByRating}
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={
                      t.providers.searchPlaceholder ||
                      "Search by name, skills, or expertise..."
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterByRating}
                </label>
                <select
                  value={urlFilters.filters.rating || ""}
                  onChange={(e) =>
                    urlFilters.updateFilter("rating", e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="">{t.providers.rating.all}</option>
                  <option value="5">{t.providers.rating.fiveStars}</option>
                  <option value="4">{t.providers.rating.fourPlus}</option>
                  <option value="3">{t.providers.rating.threePlus}</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={urlFilters.filters.status || "all"}
                  onChange={(e) =>
                    urlFilters.updateFilter("status", e.target.value)
                  }
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                </select>
              </div>

              {/* Consultations Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={urlFilters.filters.consultations || false}
                    onChange={(e) =>
                      urlFilters.updateFilter("consultations", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t.providers.offersConsultations}
                  </span>
                </label>
              </div>

              {/* Skills Filter - Typeahead */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.providers.filterBySkills}
                </label>
                <SkillsAutocomplete
                  value={urlFilters.filters.skills || []}
                  onChange={(skills) =>
                    urlFilters.updateFilter("skills", skills)
                  }
                  placeholder={
                    t.providers.skillsPlaceholder || "Search and add skills..."
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProviders.length === 1
                  ? `1 expert found`
                  : `${filteredProviders.length} experts found`}
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
                    {t.providers.noResultsDesc}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
                        {provider.status && (
                          <div
                            className={`w-2 h-2 rounded-full ${
                              provider.status === "available"
                                ? "bg-green-500"
                                : provider.status === "busy"
                                  ? "bg-orange-500"
                                  : "bg-gray-400"
                            }`}
                          />
                        )}
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

                  {/* Categories */}
                  {(provider.primaryCategory ||
                    provider.secondaryCategories?.length) && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.primaryCategory && (
                        <Link
                          to={`/${currentLanguage}/category/${Object.keys(CATEGORY_MAPPING).find((key) => CATEGORY_MAPPING[key] === provider.primaryCategory) || provider.primaryCategory.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`}
                          className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium hover:bg-green-100 transition-colors"
                        >
                          {provider.primaryCategory}
                        </Link>
                      )}
                      {provider.secondaryCategories?.map((category, index) => (
                        <Link
                          key={index}
                          to={`/${currentLanguage}/category/${Object.keys(CATEGORY_MAPPING).find((key) => CATEGORY_MAPPING[key] === category) || category.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}`}
                          className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}

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
