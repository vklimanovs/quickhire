import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import RoleSwitchModal from "../components/RoleSwitchModal";
import ProposalModal from "../components/ProposalModal";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";
import { useVerificationRestrictions } from "../hooks/useVerificationRestrictions";
import { EmailVerificationAlert } from "../components/EmailVerificationAlert";
// TODO: Replace with actual API imports
import { Task, Proposal } from "../Types";
import {
  Calendar,
  Euro,
  MapPin,
  Clock,
  User,
  Star,
  CheckCircle,
  AlertCircle,
  Send,
  Edit,
  Trash2,
  MessageCircle,
  Globe,
  Briefcase,
  Flag,
} from "lucide-react";

export default function TaskDetail() {
  const { id } = useParams();
  const { currentLanguage, t } = useLanguage();
  const { user, isAuthenticated, switchRole, hasRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { canProposeToTasks, isRestricted, restrictionMessage } =
    useVerificationRestrictions();

  const [task, setTask] = useState<Task | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoleSwitchModal, setShowRoleSwitchModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [userProposal, setUserProposal] = useState<Proposal | null>(null);

  // Load task and proposals
  useEffect(() => {
    const loadTask = () => {
      setIsLoading(true);
      try {
        if (!id) {
          setTask(null);
          return;
        }

        // TODO: Replace with actual API call
        const taskData = null; // Placeholder
        if (!taskData) {
          setTask(null);
          return;
        }

        setTask(taskData);

        // Load proposals if user is the task owner
        if (user && taskData.customerId === user.id) {
          // TODO: Replace with actual API call
          setProposals([]);
        } else {
          // Clear proposals if not task owner
          setProposals([]);
        }

        // Check if current user has already proposed (only for freelancers)
        if (user && user.accountType === "provider") {
          // TODO: Replace with actual API call
          setUserProposal(null);
        } else {
          // Clear user proposal if not freelancer
          setUserProposal(null);
        }
      } catch (error) {
        console.error("Failed to load task:", error);
        setTask(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [id, user, user?.accountType]); // Added user?.accountType to dependencies for role changes

  // Check access permissions for proposals
  const checkProposalAccess = () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(
        `/${currentLanguage}/login?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
      return false;
    }

    if (user?.accountType !== "provider") {
      // Show role switch modal for non-freelancers trying to propose
      setShowRoleSwitchModal(true);
      return false;
    }

    if (!canProposeToTasks) {
      // Show verification required message
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
      return false;
    }

    return true;
  };

  const handleRoleSwitch = async () => {
    try {
      await switchRole("provider");
      setShowRoleSwitchModal(false);

      toast({
        title:
          currentLanguage === "ru"
            ? "Роль изменена"
            : currentLanguage === "en"
              ? "Role switched"
              : "Roll vahetatud",
        description:
          currentLanguage === "ru"
            ? "Теперь вы можете просматривать задачи и отправлять предложения."
            : currentLanguage === "en"
              ? "You can now view tasks and submit proposals."
              : "Nüüd saate vaadata ülesandeid ja esitada pakkumisi.",
        variant: "default",
      });

      // No need to reload - the context will update automatically
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
            ? "Не удалось переключить роль."
            : currentLanguage === "en"
              ? "Failed to switch role."
              : "Rolli vahetamine ebaõnnestus.",
        variant: "destructive",
      });
    }
  };

  const handlePropose = () => {
    if (!checkProposalAccess()) return;
    setIsEditingProposal(false);
    setShowProposalModal(true);
  };

  const handleEditProposal = () => {
    if (!checkProposalAccess()) return;
    setIsEditingProposal(true);
    setShowProposalModal(true);
  };

  const handleSubmitProposal = async (proposalData: {
    coverLetter?: string;
    bidAmount?: number;
    timeline?: string;
  }) => {
    if (!user || !task) return;

    try {
      if (isEditingProposal && userProposal) {
        // Update existing proposal
        // TODO: Replace with actual API call
        const updatedProposal = { ...userProposal, ...proposalData };
        if (updatedProposal) {
          setUserProposal(updatedProposal);
          toast({
            title:
              currentLanguage === "ru"
                ? "Предлож��ние обновлено"
                : currentLanguage === "en"
                  ? "Proposal updated"
                  : "Pakkumine uuendatud",
            variant: "default",
          });
        }
      } else {
        // Create new proposal
        // TODO: Replace with actual API call
        const newProposal = {
          id: `prop-${Date.now()}`,
          taskId: task.id,
          providerId: user.id,
          providerName: `${user.firstName} ${user.lastName}`,
          providerPhoto: user.profileImage || "",
          providerRating: 4.8,
          providerSkills: [],
          providerLanguages: [],
          providerLocation: "",
          providerCompletedProjects: 25,
          bidAmount: proposalData.bidAmount || 0,
          timeline: proposalData.timeline || "",
          coverLetter: proposalData.coverLetter || "",
          status: "pending" as const,
          submittedAt: new Date().toISOString(),
        };

        // setUserProposal(newProposal); // Type mismatch - needs proper Proposal object

        // Update task proposal count
        setTask((prev) =>
          prev
            ? { ...prev, proposalCount: (prev.proposalCount || 0) + 1 }
            : null,
        );

        toast({
          title:
            currentLanguage === "ru"
              ? "Предложение отправлено"
              : currentLanguage === "en"
                ? "Proposal sent"
                : "Pakkumine saadetud",
          variant: "default",
        });
      }
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
            ? "Не удалось отправить предложение."
            : currentLanguage === "en"
              ? "Failed to submit proposal."
              : "Pakkumise esitamine ebaõnnestus.",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawProposal = async () => {
    if (!userProposal) return;

    try {
      // In a real app, this would call an API to delete the proposal
      // For now, we'll just update the status to declined
      // TODO: Replace with actual API call
      setUserProposal(null);

      // Update task proposal count
      setTask((prev) =>
        prev
          ? {
              ...prev,
              proposalCount: Math.max(0, (prev.proposalCount || 1) - 1),
            }
          : null,
      );

      toast({
        title:
          currentLanguage === "ru"
            ? "Предложение отозвано"
            : currentLanguage === "en"
              ? "Proposal withdrawn"
              : "Pakkumine tagasi võetud",
        variant: "default",
      });
    } catch (error) {
      toast({
        title:
          currentLanguage === "ru"
            ? "Ош��бка"
            : currentLanguage === "en"
              ? "Error"
              : "Viga",
        description:
          currentLanguage === "ru"
            ? "Не удалось отозвать предложение."
            : currentLanguage === "en"
              ? "Failed to withdraw proposal."
              : "Pakkumise tagasivõtmine ebaõnnestus.",
        variant: "destructive",
      });
    }
  };

  const handleChooseFreelancer = async (proposalId: string) => {
    try {
      // TODO: Replace with actual API call
      const result = { proposal: null };

      // if (result.error) {
      //   throw new Error(result.error);
      // }

      // Update local state
      setProposals((prev) =>
        prev.map((p) => ({
          ...p,
          status: p.id === proposalId ? "accepted" : "rejected",
        })),
      );

      setTask((prev) => (prev ? { ...prev, status: "in_progress" } : null));

      toast({
        title:
          currentLanguage === "ru"
            ? "Фрилансер выбран"
            : currentLanguage === "en"
              ? "Freelancer chosen"
              : "Vabakutseline valitud",
        description:
          currentLanguage === "ru"
            ? "Задача назначена. Начните общение с выбранным фрилансером."
            : currentLanguage === "en"
              ? "Task assigned. Start communicating with the chosen freelancer."
              : "Ülesanne määratud. Alustage suhtlust valitud vabakutselisega.",
        variant: "default",
      });

      // In a real app, this would open a conversation
      // For now, just navigate to messages
      setTimeout(() => {
        navigate(`/${currentLanguage}/messages`);
      }, 2000);
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
            ? "Не удалось ��ыбрать фрилансера."
            : currentLanguage === "en"
              ? "Failed to choose freelancer."
              : "Vabakutselise valimine ebaõnnestus.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {currentLanguage === "ru"
                ? "Загрузка задачи..."
                : currentLanguage === "en"
                  ? "Loading task..."
                  : "Ülesande laadimine..."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-6xl font-bold text-blue-100 block">
                404
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {currentLanguage === "ru"
                ? "Задача не найдена"
                : currentLanguage === "en"
                  ? "Task not found"
                  : "Ülesannet ei leitud"}
            </h1>
            <p className="text-gray-600 mb-8">
              {currentLanguage === "ru"
                ? "Запрашиваемая задача не существует или была уда��ена."
                : currentLanguage === "en"
                  ? "The requested task does not exist or has been removed."
                  : "Taotletud ülesannet ei ole olemas või on see eemaldatud."}
            </p>
            <Link
              to={`/${currentLanguage}/tasks`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentLanguage === "ru"
                ? "Просмотреть все задачи"
                : currentLanguage === "en"
                  ? "View All Tasks"
                  : "Vaata kõiki ülesandeid"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Check if user is task owner (client view)
  const isTaskOwner = user && task.clientId === user.id;

  // Check if user can view this task - allow freelancers and task owners
  const canViewTask = isTaskOwner || user?.accountType === "provider";

  // For non-authenticated users, redirect to login
  if (!isAuthenticated) {
    navigate(
      `/${currentLanguage}/login?redirect=${encodeURIComponent(window.location.pathname)}`,
    );
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${task.title} | QuickHire.ee`}
        description={`${task.description.substring(0, 150)}...`}
        keywords={`${task.skills.join(", ")}, ${task.category}, freelance job`}
        url={`https://quickhire.ee/task/${task.id}`}
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Show content only if user can view task OR show role switch modal */}
            {canViewTask ? (
              <>
                {/* Task Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium mb-3 inline-block">
                        {task.category}
                      </span>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {task.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        {/* Priority Badge */}
                        <div className="flex items-center">
                          <Flag className="h-4 w-4 mr-1" />
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              false // task.priority === "critical" - priority not in Task type
                                ? "bg-red-100 text-red-800"
                                : false // task.priority === "urgent" - priority not in Task type
                                  ? "bg-orange-100 text-orange-800"
                                  : false // task.priority === "high" - priority not in Task type
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {false // task.priority === "critical" - priority not in Task type
                              ? currentLanguage === "ru"
                                ? "Критический"
                                : currentLanguage === "en"
                                  ? "Critical"
                                  : "Kriitiline"
                              : false // task.priority === "urgent" - priority not in Task type
                                ? currentLanguage === "ru"
                                  ? "Срочно"
                                  : currentLanguage === "en"
                                    ? "Urgent"
                                    : "Kiire"
                                : false // task.priority === "high" - priority not in Task type
                                  ? currentLanguage === "ru"
                                    ? "Высокий"
                                    : currentLanguage === "en"
                                      ? "High"
                                      : "Kõrge"
                                  : currentLanguage === "ru"
                                    ? "Обычный"
                                    : currentLanguage === "en"
                                      ? "Normal"
                                      : "Tavaline"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(task.postedAt).toLocaleDateString(
                            currentLanguage,
                          )}
                        </div>
                        {false && ( // task.remoteOk - remoteOk not in Task type
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            {currentLanguage === "ru"
                              ? "Удаленно"
                              : currentLanguage === "en"
                                ? "Remote OK"
                                : "Kaugtöö OK"}
                          </div>
                        )}
                        {false && ( // task.deadline - deadline not in Task type
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {currentLanguage === "ru"
                              ? "До"
                              : currentLanguage === "en"
                                ? "Due"
                                : "Tähtaeg"}{" "}
                            {new Date().toLocaleDateString(
                              // task.deadline - deadline not in Task type
                              currentLanguage,
                            )}
                          </div>
                        )}
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {task.proposalCount || 0}{" "}
                          {currentLanguage === "ru"
                            ? "предложений"
                            : currentLanguage === "en"
                              ? "proposals"
                              : "pakkumist"}
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="flex items-center text-2xl font-bold text-gray-900 mb-2">
                        <Euro className="h-6 w-6 text-green-600 mr-1" />
                        {task.budget} €
                      </div>
                      <span className="text-sm text-gray-500">
                        {false // task.budgetType === "fixed" - budgetType not in Task type
                          ? currentLanguage === "ru"
                            ? "Фиксированная цена"
                            : currentLanguage === "en"
                              ? "Fixed price"
                              : "Fikseeritud hind"
                          : currentLanguage === "ru"
                            ? "Почасовая оплата"
                            : currentLanguage === "en"
                              ? "Hourly rate"
                              : "Tunnipõhine"}
                      </span>
                    </div>
                  </div>

                  {/* Email Verification Alert */}
                  {user?.accountType === "provider" &&
                    !isTaskOwner &&
                    isRestricted && (
                      <EmailVerificationAlert
                        emailVerified={user?.isEmailVerified || false}
                        email={user?.email || ""}
                        className="mb-4"
                        showActions={true}
                      />
                    )}

                  {/* Freelancer Actions - STRICT: Only show if current role is freelance AND not task owner AND task is open */}
                  {user?.accountType === "provider" && !isTaskOwner && (
                    <div className="space-y-3">
                      {task.status === "open" && task.clientId !== user?.id ? (
                        !userProposal ? (
                          <button
                            onClick={handlePropose}
                            disabled={!canProposeToTasks}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                              !canProposeToTasks
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            <Send className="h-5 w-5 mr-2" />
                            {currentLanguage === "ru"
                              ? "Предложить"
                              : currentLanguage === "en"
                                ? "Propose"
                                : "Pakkumine"}
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={handleEditProposal}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <Edit className="h-5 w-5 mr-2" />
                              {currentLanguage === "ru"
                                ? "Редактировать предложение"
                                : currentLanguage === "en"
                                  ? "Edit Proposal"
                                  : "Muuda pakkumist"}
                            </button>
                            <button
                              onClick={handleWithdrawProposal}
                              className="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="h-5 w-5 mr-2" />
                              {currentLanguage === "ru"
                                ? "Отозвать"
                                : currentLanguage === "en"
                                  ? "Withdraw"
                                  : "Võta tagasi"}
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600">
                            {task.status === "in_progress"
                              ? currentLanguage === "ru"
                                ? "Задача уже назначена"
                                : currentLanguage === "en"
                                  ? "Task already assigned"
                                  : "Ülesanne on juba määratud"
                              : false // task.status === "closed" - "closed" not in Task status type
                                ? currentLanguage === "ru"
                                  ? "Задача закрыта"
                                  : currentLanguage === "en"
                                    ? "Task is closed"
                                    : "Ülesanne on suletud"
                                : task.clientId === user?.id
                                  ? currentLanguage === "ru"
                                    ? "Это ваша задача"
                                    : currentLanguage === "en"
                                      ? "It's your task"
                                      : "See on teie ülesanne"
                                  : currentLanguage === "ru"
                                    ? "Вы уже предложили"
                                    : currentLanguage === "en"
                                      ? "You already proposed"
                                      : "Olete juba pakkumise teinud"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {task.status === "in_progress" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">
                          {currentLanguage === "ru"
                            ? "Задача назначена"
                            : currentLanguage === "en"
                              ? "Task assigned"
                              : "Ülesanne määratud"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-center">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentLanguage === "ru"
                    ? "Нужна роль фрилансера"
                    : currentLanguage === "en"
                      ? "Freelance role required"
                      : "Vabakutselise roll vajalik"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {currentLanguage === "ru"
                    ? "��олько фрилансеры могут просматривать задачи и отправлять предложения."
                    : currentLanguage === "en"
                      ? "Only freelancers can view tasks and submit proposals."
                      : "Ainult vabakutselised saavad vaadata ülesandeid ja esitada pakkumisi."}
                </p>
                <button
                  onClick={() => setShowRoleSwitchModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {currentLanguage === "ru"
                    ? "Переключиться на фрилансера"
                    : currentLanguage === "en"
                      ? "Switch to Freelance"
                      : "Lülitu vabakutseliseks"}
                </button>
              </div>
            )}

            {/* Only show content sections if user can view task */}
            {canViewTask && (
              <>
                {/* Task Description */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentLanguage === "ru"
                      ? "Описание проекта"
                      : currentLanguage === "en"
                        ? "Project Description"
                        : "Projekti kirjeldus"}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {task.description}
                    </div>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentLanguage === "ru"
                      ? "Требуемые н��выки"
                      : currentLanguage === "en"
                        ? "Skills Required"
                        : "Nõutavad oskused"}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {task.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Proposals List (for task owners only) */}
            {isTaskOwner && proposals.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentLanguage === "ru"
                    ? "Предложения"
                    : currentLanguage === "en"
                      ? "Proposals"
                      : "Pakkumised"}{" "}
                  ({proposals.length})
                </h2>
                <div className="space-y-6">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      {/* Proposal Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {proposal.providerName}
                            </h3>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium text-gray-900">
                                {proposal.providerRating || 4.8}
                              </span>
                              <span className="ml-1 text-sm text-gray-500">
                                ({proposal.providerCompletedProjects || 25}{" "}
                                projects)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {proposal.bidAmount && (
                            <div className="text-lg font-bold text-gray-900">
                              €{proposal.bidAmount}
                            </div>
                          )}
                          {proposal.timeline && (
                            <div className="text-sm text-gray-500">
                              in {proposal.timeline}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Proposal Info */}
                      {proposal.coverLetter && (
                        <p className="text-gray-700 mb-4">
                          {proposal.coverLetter}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {currentLanguage === "ru"
                            ? "Подано"
                            : currentLanguage === "en"
                              ? "Submitted"
                              : "Esitatud"}{" "}
                          {new Date(proposal.submittedAt).toLocaleDateString(
                            currentLanguage,
                          )}
                        </span>
                        <div className="space-x-3">
                          {proposal.status === "pending" &&
                            task.status === "open" && (
                              <button
                                onClick={() =>
                                  handleChooseFreelancer(proposal.id)
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                              >
                                {currentLanguage === "ru"
                                  ? "Выбрать фрилансера"
                                  : currentLanguage === "en"
                                    ? "Choose Freelancer"
                                    : "Vali vabakutseline"}
                              </button>
                            )}
                          {proposal.status === "accepted" && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-medium">
                              {currentLanguage === "ru"
                                ? "Принято"
                                : currentLanguage === "en"
                                  ? "Accepted"
                                  : "Vastu võetud"}
                            </span>
                          )}
                          {proposal.status === "rejected" && (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm font-medium">
                              {currentLanguage === "ru"
                                ? "Отклонено"
                                : currentLanguage === "en"
                                  ? "Declined"
                                  : "Tagasi lükatud"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLanguage === "ru"
                  ? "Детали проекта"
                  : currentLanguage === "en"
                    ? "Project Details"
                    : "Projekti üksikasjad"}
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-600 block mb-1">
                    {currentLanguage === "ru"
                      ? "Бюджет"
                      : currentLanguage === "en"
                        ? "Budget"
                        : "Eelarve"}
                  </span>
                  <span className="font-medium text-gray-900 text-lg">
                    {task.budget} €
                  </span>
                  <div className="text-gray-500">
                    {false // task.budgetType === "fixed" - budgetType not in Task type
                      ? currentLanguage === "ru"
                        ? "Фиксированная цена"
                        : currentLanguage === "en"
                          ? "Fixed price"
                          : "Fikseeritud hind"
                      : currentLanguage === "ru"
                        ? "Почасовая оплата"
                        : currentLanguage === "en"
                          ? "Hourly rate"
                          : "Tunnipõhine"}
                  </div>
                </div>

                {false && ( // task.deadline - deadline not in Task type
                  <div>
                    <span className="text-gray-600 block mb-1">
                      {currentLanguage === "ru"
                        ? "Срок"
                        : currentLanguage === "en"
                          ? "Deadline"
                          : "Tähtaeg"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {new Date().toLocaleDateString(
                        // task.deadline - deadline not in Task type
                        currentLanguage,
                      )}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-gray-600 block mb-1">
                    {currentLanguage === "ru"
                      ? "Приоритет"
                      : currentLanguage === "en"
                        ? "Priority"
                        : "Prioriteet"}
                  </span>
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      false // task.priority === "critical" - priority not in Task type
                        ? "bg-red-100 text-red-800"
                        : false // task.priority === "urgent" - priority not in Task type
                          ? "bg-orange-100 text-orange-800"
                          : false // task.priority === "high" - priority not in Task type
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {false // task.priority === "critical" - priority not in Task type
                      ? currentLanguage === "ru"
                        ? "Критический"
                        : currentLanguage === "en"
                          ? "Critical"
                          : "Kriitiline"
                      : false // task.priority === "urgent" - priority not in Task type
                        ? currentLanguage === "ru"
                          ? "Срочно"
                          : currentLanguage === "en"
                            ? "Urgent"
                            : "Kiire"
                        : false // task.priority === "high" - priority not in Task type
                          ? currentLanguage === "ru"
                            ? "Высокий"
                            : currentLanguage === "en"
                              ? "High"
                              : "Kõrge"
                          : currentLanguage === "ru"
                            ? "Обычный"
                            : currentLanguage === "en"
                              ? "Normal"
                              : "Tavaline"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600 block mb-1">
                    {currentLanguage === "ru"
                      ? "Статус"
                      : currentLanguage === "en"
                        ? "Status"
                        : "Staatus"}
                  </span>
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      task.status === "open"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status === "open"
                      ? currentLanguage === "ru"
                        ? "Откры��а"
                        : currentLanguage === "en"
                          ? "Open"
                          : "Avatud"
                      : task.status === "in_progress"
                        ? currentLanguage === "ru"
                          ? "Назначена"
                          : currentLanguage === "en"
                            ? "Assigned"
                            : "Määratud"
                        : currentLanguage === "ru"
                          ? "Закрыта"
                          : currentLanguage === "en"
                            ? "Closed"
                            : "Suletud"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600 block mb-1">
                    {currentLanguage === "ru"
                      ? "Получено предложений"
                      : currentLanguage === "en"
                        ? "Proposals received"
                        : "Saadud pakkumised"}
                  </span>
                  <span className="font-medium text-gray-900">
                    {task.proposalCount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    {currentLanguage === "ru"
                      ? "Оставайтесь в безопасности"
                      : currentLanguage === "en"
                        ? "Stay Safe"
                        : "Olge turvaline"}
                  </h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    {currentLanguage === "ru"
                      ? "Держите все общение и платежи в рамках п��атформы QuickHire для вашей защиты."
                      : currentLanguage === "en"
                        ? "Keep all communication and payments within the QuickHire platform for your protection."
                        : "Hoidke kogu suhtlus ja maksed QuickHire platvormi piires oma kaitse huvides."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Role Switch Modal */}
      <RoleSwitchModal
        isOpen={showRoleSwitchModal}
        onClose={() => setShowRoleSwitchModal(false)}
        title={
          currentLanguage === "ru"
            ? "Переключиться на Фрилансера для прос��отра и предложений"
            : currentLanguage === "en"
              ? "Switch to Freelance to view & propose"
              : "Lülitu vabakutseliseks vaatamiseks ja pakkumiseks"
        }
        description={
          currentLanguage === "ru"
            ? "Только фрилансеры могут просматривать задачи и отправлять предложения. Переключитесь на роль фрилансера, чтобы продолжить."
            : currentLanguage === "en"
              ? "Only freelancers can view tasks and submit proposals. Switch to freelance role to continue."
              : "Ainult vabakutselised saavad vaadata ülesandeid ja esitada pakkumisi. Jätkamiseks lülituge vabakutselise rolli."
        }
        targetRole="freelance"
        onSwitch={handleRoleSwitch}
      />

      {/* Proposal Modal */}
      {task && (
        <ProposalModal
          isOpen={showProposalModal}
          onClose={() => setShowProposalModal(false)}
          task={task}
          onSubmit={handleSubmitProposal}
          isEditing={isEditingProposal}
          existingProposal={
            userProposal
              ? {
                  coverLetter: (userProposal as any).coverLetter || "",
                  bidAmount: (userProposal as any).bidAmount || 0,
                  timeline: (userProposal as any).timeline || "",
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
