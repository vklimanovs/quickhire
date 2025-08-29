import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { Task } from "../Types";
import { useVerificationRestrictions } from "../hooks/useVerificationRestrictions";
import { useToast } from "../hooks/use-toast";
import { useSubscription } from "../lib/SubscriptionContext";
import {
  Search,
  Filter,
  Calendar,
  Euro,
  Clock,
  User,
  Target,
  Globe,
  Users,
  Briefcase,
} from "lucide-react";

const categories = [
  { key: "all", slug: "all" },
  { key: "developmentIt", slug: "development-it" },
  { key: "designCreative", slug: "design-creative" },
  { key: "aiServices", slug: "ai-services" },
  { key: "salesMarketing", slug: "sales-marketing" },
  { key: "writingTranslation", slug: "writing-translation" },
  { key: "adminSupport", slug: "admin-support" },
  { key: "financeAccounting", slug: "finance-accounting" },
  { key: "legal", slug: "legal" },
  { key: "hrTraining", slug: "hr-training" },
  { key: "engineeringArchitecture", slug: "engineering-architecture" },
  { key: "otherServices", slug: "other-services" },
];

// Role-aware action button component
function RoleBasedActionButton({
  currentLanguage,
}: {
  currentLanguage: string;
}) {
  const { switchRole } = useAuth();
  const { isRestricted, restrictionMessage } = useVerificationRestrictions();
  const { toast } = useToast();
  const { openSubscriptionModal } = useSubscription();
  const currentRole = localStorage.getItem("selected_account_type");
  const isProvider = currentRole === "provider";
  const isClient = currentRole === "customer";

  const handleSwitchToClient = async () => {
    try {
      await switchRole("customer");
    } catch (error) {
      console.error("Failed to switch to client role:", error);
    }
  };

  if (isClient) {
    const handlePostTask = (e: React.MouseEvent) => {
      e.preventDefault();
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
      openSubscriptionModal("post-task");
    };

    return (
      <button
        onClick={handlePostTask}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <Target className="h-5 w-5 mr-2" />
        {currentLanguage === "ru"
          ? "Разместить задачу"
          : currentLanguage === "en"
            ? "Post a Task"
            : "Postita ülesanne"}
      </button>
    );
  }

  if (isProvider) {
    return (
      <div className="inline-flex items-center px-6 py-3 bg-gray-100 border border-gray-300 rounded-xl">
        <div className="mr-4">
          <div className="text-sm font-medium text-gray-700">
            {currentLanguage === "ru"
              ? "Размещение задач для клиентов"
              : currentLanguage === "en"
                ? "Posting is for clients"
                : "Ülesannete postitamine on klientide jaoks"}
          </div>
          <div className="text-xs text-gray-500">
            {currentLanguage === "ru"
              ? "Переключитесь на клиентский аккаунт для размещения задач"
              : currentLanguage === "en"
                ? "Switch to your client account to post a task"
                : "Lülituge klientkonto peale ülesande postitamiseks"}
          </div>
        </div>
        <button
          onClick={handleSwitchToClient}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Users className="h-4 w-4 mr-2" />
          {currentLanguage === "ru"
            ? "Переключиться на клиента"
            : currentLanguage === "en"
              ? "Switch to Client"
              : "Lülitu klientiks"}
        </button>
      </div>
    );
  }

  return (
    <Link
      to={`/${currentLanguage}/create-task`}
      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <Target className="h-5 w-5 mr-2" />
      {currentLanguage === "ru"
        ? "Разместить задачу"
        : currentLanguage === "en"
          ? "Post a Task"
          : "Postita ülesanne"}
    </Link>
  );
}

export default function BrowseTasks() {
  const { currentLanguage, t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const loadTasks = () => {
      setIsLoading(true);
      try {
        setTasks([]);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.skills.some((skill) =>
            skill.toLowerCase().includes(searchLower),
          );

        if (!matchesSearch) return false;
      }

      if (selectedCategory && selectedCategory !== "all") {
        if (task.category !== selectedCategory) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "budgetHigh":
          return b.budget - a.budget;
        case "budgetLow":
          return a.budget - b.budget;
        case "newest":
        default:
          return (
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );
      }
    });

    return filtered;
  }, [tasks, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  const hasActiveFilters = selectedCategory;

  const getSEOTitle = () => {
    switch (currentLanguage) {
      case "en":
        return "Freelance Jobs & Projects in Estonia | QuickHire.ee";
      case "ru":
        return "Фриланс работы и проекты в Эстонии | QuickHire.ee";
      default:
        return "Leia tööülesandeid | QuickHire.ee";
    }
  };

  const getSEODescription = () => {
    switch (currentLanguage) {
      case "en":
        return "Browse new tasks and find projects that fit your interests and expertise.";
      case "ru":
        return "Просматривайте новые задачи и находите проекты, соответствующие вашим интересам и опыту.";
      default:
        return "Sirvi uusi tööülesandeid ja leia sobiv projekt – QuickHire.ee";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={getSEOTitle()}
        description={getSEODescription()}
        keywords={
          currentLanguage === "ru"
            ? "задачи Эстония, фриланс-проекты, удаленная работа, фриланс-задачи"
            : currentLanguage === "en"
              ? "tasks Estonia, freelance projects, remote work, freelance tasks"
              : "tööülesanded Eesti, freelance projektid, remote töö, freelance ülesanded"
        }
        url={`https://quickhire.ee/${currentLanguage}/tasks`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.tasks.title}
              </h1>
              <p className="text-lg text-gray-600">{t.tasks.subtitle}</p>
            </div>
            <div className="flex-shrink-0">
              <RoleBasedActionButton currentLanguage={currentLanguage} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  {t.tasks.filterBy}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                  >
                    {t.tasks.clearFilters}
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.tasks.searchPlaceholder}
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
                  {categories.map((category) => (
                    <option
                      key={category.slug}
                      value={category.slug === "all" ? "" : category.slug}
                    >
                      {category.key === "all"
                        ? t.tasks.allCategories
                        : t.categories[
                            category.key as keyof typeof t.categories
                          ]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Notice */}
              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  {currentLanguage === "ru"
                    ? "Показаны только открытые задачи"
                    : currentLanguage === "en"
                      ? "Showing only open tasks"
                      : "Näidatakse ainult avatud ülesandeid"}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                {filteredAndSortedTasks.length === 0
                  ? t.tasks.noResults
                  : `${t.tasks.showingResults} ${filteredAndSortedTasks.length} ${filteredAndSortedTasks.length === 1 ? t.common.taskSingular : t.common.taskPlural}`}
              </p>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {t.tasks.sortBy}:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="newest">{t.tasks.sorting.newest}</option>
                  <option value="budgetHigh">
                    {t.tasks.sorting.budgetHigh}
                  </option>
                  <option value="budgetLow">{t.tasks.sorting.budgetLow}</option>
                </select>
              </div>
            </div>

            {/* No Results */}
            {filteredAndSortedTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.tasks.noResults}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t.tasks.noResults || "Try adjusting your filters"}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    {t.tasks.clearFilters}
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t.common.loading}</p>
              </div>
            )}

            {/* Task Cards */}
            {!isLoading && (
              <div className="space-y-6">
                {filteredAndSortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                          <Link to={`/${currentLanguage}/task/${task.id}`}>
                            {task.title}
                          </Link>
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                            {
                              t.categories[
                                categories.find((c) => c.slug === task.category)
                                  ?.key as keyof typeof t.categories
                              ]
                            }
                          </span>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(task.postedAt).toLocaleDateString(
                              currentLanguage,
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="lg:text-right">
                        <div className="flex items-center lg:justify-end text-lg font-semibold text-gray-900 mb-1">
                          <Euro className="h-5 w-5 text-green-600 mr-1" />
                          {task.budget} €
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentLanguage === "ru"
                            ? "Бюджет"
                            : currentLanguage === "en"
                              ? "Budget"
                              : "Eelarve"}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {task.proposalCount}{" "}
                          {currentLanguage === "ru"
                            ? "предложений"
                            : currentLanguage === "en"
                              ? "proposals"
                              : "pakkumist"}
                        </div>
                      </div>
                      <Link
                        to={`/${currentLanguage}/task/${task.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        {currentLanguage === "ru"
                          ? "Посмотреть задачу"
                          : currentLanguage === "en"
                            ? "View Task"
                            : "Vaata ülesannet"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredAndSortedTasks.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  {t.tasks.loadMore}
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
