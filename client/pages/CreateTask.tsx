import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import SkillsAutocomplete from "../components/SkillsAutocomplete";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useSubscription } from "../lib/SubscriptionContext";
import { useToast } from "../hooks/use-toast";
import GateModal from "../components/GateModal";
import { useGate } from "../hooks/useGate";
// TODO: Replace with actual API imports
import { Task, TaskFormData } from "../Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ArrowLeft,
  Save,
  Send,
  FileText,
  Calendar,
  Globe,
  FileCheck,
  Shield,
  AlertCircle,
} from "lucide-react";

const CATEGORIES = [
  { value: "development-it", label: "Development & IT" },
  { value: "design-creative", label: "Design & Creative" },
  { value: "ai-services", label: "AI Services" },
  { value: "sales-marketing", label: "Sales & Marketing" },
  { value: "writing-translation", label: "Writing & Translation" },
  { value: "admin-support", label: "Admin & Support" },
  { value: "finance-accounting", label: "Finance & Accounting" },
  { value: "legal", label: "Legal" },
  { value: "hr-training", label: "HR & Training" },
  { value: "engineering-architecture", label: "Engineering & Architecture" },
  { value: "other-services", label: "Other Services" },
];

export default function CreateTask() {
  const { currentLanguage, t } = useLanguage();
  const { user, isAuthenticated, isLoading, switchRole } = useAuth();
  const { canPostTasks, openSubscriptionModal } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  const gate = useGate({
    actionName: "Post Task",
    onSuccess: () => {
      // Continue with task posting after successful gate
    },
  });

  // Role guard: Prevent providers from accessing task creation
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const currentRole = localStorage.getItem("selected_account_type");
      if (currentRole === "provider") {
        // Provider trying to access task creation - show toast and redirect
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
                  // After switching, redirect to create-task
                  navigate(`/${currentLanguage}/create-task`);
                } catch (error) {
                  console.error("Failed to switch to client role:", error);
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

        // Redirect back to tasks page
        navigate(`/${currentLanguage}/tasks`);
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    currentLanguage,
    navigate,
    toast,
    switchRole,
  ]);

  const [formData, setFormData] = useState<TaskFormData>({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    budget: "",
    timeline: "",
    budgetType: "fixed",
    budgetAmount: 0,
    deadline: "",
    skills: [],
    languages: [],
    remoteOk: true,
    requiresInvoice: false,
    priority: "normal",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track if user has accessed the form (to prevent auto-save on initial load)
  const [hasAccessedForm, setHasAccessedForm] = useState(false);

  // Auto-save draft functionality - only if user has accessed the form
  useEffect(() => {
    if (hasUnsavedChanges && isAuthenticated && hasAccessedForm) {
      const timer = setTimeout(() => {
        localStorage.setItem("createTaskDraft", JSON.stringify(formData));
        setHasUnsavedChanges(false);
        toast({
          title: "Draft saved",
          description: "Your progress has been automatically saved.",
          variant: "default",
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formData, hasUnsavedChanges, isAuthenticated, hasAccessedForm, toast]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("createTaskDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
        setHasAccessedForm(true); // User had a draft, so they accessed the form before
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Track form changes - only set unsaved changes if user has accessed the form
  useEffect(() => {
    if (hasAccessedForm) {
      setHasUnsavedChanges(true);
    }
  }, [formData, hasAccessedForm]);

  // Show loading if authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show gate modal instead of redirecting
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Требуется авторизация"
                : currentLanguage === "en"
                  ? "Authentication Required"
                  : "Autentimine nõutav"}
            </h1>
            <p className="text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Пожалуйста, войдите в систему, чтобы создать задачу."
                : currentLanguage === "en"
                  ? "Please log in to create a task."
                  : "Palun logige sisse ülesande loomiseks."}
            </p>
            <Link
              to={`/${currentLanguage}/login`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {currentLanguage === "ru"
                ? "Войти"
                : currentLanguage === "en"
                  ? "Log In"
                  : "Logi sisse"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If provider tries to access and doesn't have customer role, show gate modal
  if (user.accountType === "provider" && !user.roles?.isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Станьте клиентом, чтобы публиковать задачи"
                : currentLanguage === "en"
                  ? "Become a Customer to post tasks"
                  : "Saage kliendiks ülesannete postitamiseks"}
            </h1>
            <p className="text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Публикация задач требует роли клиента. Переключитесь на роль клиента, чтобы продолжить."
                : currentLanguage === "en"
                  ? "Posting tasks requires a Customer role. Switch to Customer role to continue."
                  : "Ülesannete postitamine nõuab kliendi rolli. Lülituge kliendi rollile jätkamiseks."}
            </p>
            <button
              onClick={() => gate.executeWithGate(() => {})}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {currentLanguage === "ru"
                ? "Переключить на клиента"
                : currentLanguage === "en"
                  ? "Switch to Customer"
                  : "Lülita kliendile"}
            </button>
          </div>
        </main>
        <Footer />

        {/* Gate Modal */}
        <GateModal
          isOpen={gate.isGateOpen}
          onClose={gate.handleGateClose}
          onSuccess={gate.handleGateSuccess}
          actionName="Post Task"
        />
      </div>
    );
  }

  // Check subscription requirement for customers
  const isCustomer = user.accountType === "customer";
  if (isCustomer && !canPostTasks) {
    // Show subscription required message
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Требуется подписка"
                : currentLanguage === "en"
                  ? "Subscription Required"
                  : "Tellimus nõutav"}
            </h2>
            <p className="text-gray-600 mb-6">
              {currentLanguage === "ru"
                ? "Для публикации задач нужна активная подписка. Выберите план, который подходит вам."
                : currentLanguage === "en"
                  ? "To post tasks, you need an active subscription. Choose a plan that works for you."
                  : "Ülesannete postitamiseks on vaja aktiivset tellimust. Valige endale sobiv plaan."}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => openSubscriptionModal("post-task")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {currentLanguage === "ru"
                  ? "Выбрать план"
                  : currentLanguage === "en"
                    ? "Choose Plan"
                    : "Valige plaan"}
              </button>
              <Link
                to={`/${currentLanguage}/dashboard/customer`}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                {currentLanguage === "ru"
                  ? "Вернуться в панель"
                  : currentLanguage === "en"
                    ? "Back to Dashboard"
                    : "Tagasi töölaudale"}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const updateFormData = (field: keyof TaskFormData, value: any) => {
    setHasAccessedForm(true); // User is interacting with the form
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      toast({
        title: t.auth.required,
        description:
          t.taskCreation.fillRequiredFields ||
          "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Gate check for non-draft submissions
    if (!isDraft) {
      gate.executeWithGate(() => submitTask(false));
      return;
    }

    submitTask(true);
  };

  const submitTask = async (isDraft: boolean) => {
    setIsSubmitting(true);

    try {
      // Create task using MockApi
      const taskData: Omit<Task, "id" | "createdAt" | "proposals"> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skills: formData.skills,
        budget: formData.budgetAmount,
        timeline: formData.deadline || "1 week",
        status: isDraft ? "cancelled" : "open", // Use 'cancelled' for drafts temporarily
        languages: formData.languages,
        postedAt: new Date().toISOString(),
        proposalCount: 0,
        clientId: user?.id || "customer-1",
        clientName: user?.name || "Customer",
      };

      // TODO: Replace with actual API call
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        proposals: 0,
      };

      // Clear draft if publishing
      if (!isDraft) {
        localStorage.removeItem("createTaskDraft");
      }

      toast({
        title: isDraft ? "Draft saved" : "Task published successfully!",
        description: isDraft
          ? "Your task has been saved as a draft"
          : "Your task has been published and is now visible in Browse Tasks.",
        variant: "default",
      });

      // Navigate to Browse Tasks to show the new task
      if (!isDraft) {
        navigate(`/${currentLanguage}/tasks`);
      } else {
        navigate(`/${currentLanguage}/dashboard/customer?tab=tasks`);
      }
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Failed to save task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`Create New Task | QuickHire.ee`}
        description="Post a new task and get proposals from skilled freelancers"
        keywords="post task, hire freelancers, project posting"
        url={`https://quickhire.ee/${currentLanguage}/create-task`}
      />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/${currentLanguage}/dashboard/customer`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.common.back}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {t.taskCreation.createNewTask}
          </h1>
          <p className="text-gray-600 mt-2">
            Fill out the details below to post your task and start receiving
            proposals
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {/* Task Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {t.taskCreation.taskDetails}
              </h2>

              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.selectCategory}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData("category", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t.taskCreation.selectCategory}
                      />
                    </SelectTrigger>
                    <SelectContent className="!z-[100]">
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.whatDoYouNeed}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    placeholder={t.taskCreation.taskTitlePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.describeProject}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    placeholder={t.taskCreation.taskDescriptionPlaceholder}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.requiredSkills}
                  </label>
                  <SkillsAutocomplete
                    value={formData.skills}
                    onChange={(skills) => updateFormData("skills", skills)}
                    placeholder="Type to search and add skills..."
                  />
                </div>
              </div>
            </div>

            {/* Budget & Timeline */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t.taskCreation.budgetAndTimeline}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.budgetType}
                  </label>
                  <Select
                    value={formData.budgetType}
                    onValueChange={(value: "fixed" | "hourly") =>
                      updateFormData("budgetType", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!z-[100]">
                      <SelectItem value="fixed">
                        {t.taskCreation.fixedPrice}
                      </SelectItem>
                      <SelectItem value="hourly">
                        {t.taskCreation.hourlyRate}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.budgetAmount} (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.budgetAmount || ""}
                    onChange={(e) =>
                      updateFormData(
                        "budgetAmount",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.projectDeadline}
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateFormData("deadline", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t.taskCreation.additionalInfo}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remoteOk"
                    checked={formData.remoteOk}
                    onChange={(e) =>
                      updateFormData("remoteOk", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remoteOk"
                    className="ml-2 text-sm text-gray-700 flex items-center"
                  >
                    <Globe className="h-4 w-4 mr-1 text-blue-500" />
                    {t.taskCreation.remoteWorkOk}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requiresInvoice"
                    checked={formData.requiresInvoice}
                    onChange={(e) =>
                      updateFormData("requiresInvoice", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="requiresInvoice"
                    className="ml-2 text-sm text-gray-700 flex items-center"
                  >
                    <FileCheck className="h-4 w-4 mr-1 text-purple-500" />
                    Required invoice
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.taskCreation.priority || "Priority"}
                  </label>
                  <Select
                    value={formData.priority}
                    onValueChange={(
                      value: "normal" | "high" | "urgent" | "critical",
                    ) => updateFormData("priority", value)}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!z-[100]">
                      <SelectItem value="normal">
                        {t.taskCreation.priorityNormal || "Normal"}
                      </SelectItem>
                      <SelectItem value="high">
                        {t.taskCreation.priorityHigh || "High"}
                      </SelectItem>
                      <SelectItem value="urgent">
                        {t.taskCreation.priorityUrgentLabel || "Urgent"}
                      </SelectItem>
                      <SelectItem value="critical">
                        {t.taskCreation.priorityCritical || "Critical"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  disabled={isSubmitting}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t.taskCreation.saveAsDraft}
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? t.common.loading : t.taskCreation.publishTask}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                This is a demo feature - real functionality coming soon
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      {/* Gate Modal */}
      <GateModal
        isOpen={gate.isGateOpen}
        onClose={gate.handleGateClose}
        onSuccess={gate.handleGateSuccess}
        actionName="Post Task"
      />
    </div>
  );
}
