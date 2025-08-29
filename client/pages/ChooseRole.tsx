import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import { useAuth } from "../lib/AuthContext";
import SEO from "../components/layout/SEO";
import LanguageText from "../components/common/LanguageText";
import CustomCard from "../components/forms/Card";
import CustomButton from "../components/forms/Button";

export default function ChooseRole() {
  const { currentLanguage, t } = useLanguage();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<
    "provider" | "customer" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home if user is not found or already has a role
  useEffect(() => {
    if (!user) {
      navigate(`/${currentLanguage}/login`);
      return;
    }

    // If user already has a role assigned, redirect to dashboard
    // This handles existing users who shouldn't see this page
    if (user.roles.isFreelance || user.roles.isClient) {
      const dashboardPath = `/${currentLanguage}/dashboard/${user.accountType}`;
      navigate(dashboardPath);
      return;
    }
  }, [user, currentLanguage, navigate]);

  const handleRoleSelection = async (role: "provider" | "customer") => {
    if (!user) {
      navigate(`/${currentLanguage}/login`);
      return;
    }

    setIsLoading(true);
    setSelectedRole(role);

    try {
      // Store role selection in local storage until backend integration
      const roleSelection = {
        userId: user.id,
        role: role,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "pending_role_selection",
        JSON.stringify(roleSelection),
      );

      // Frontend callback for role selection (placeholder for backend integration)
      const handleRoleSelectionCallback = (selectedRole: string) => {
        console.log("Role selection callback:", selectedRole);
        // TODO: This will be connected to backend API later
        return Promise.resolve();
      };

      // Call frontend callback
      await handleRoleSelectionCallback(role);

      // Update user with selected role
      const updatedUser = {
        ...user,
        accountType: role,
        roles: {
          isFreelance: role === "provider",
          isClient: role === "customer",
        },
        subscription: {
          status: (role === "customer" ? "active" : "inactive") as
            | "active"
            | "inactive"
            | "expired",
        },
      };

      // Update user through AuthContext
      updateUser(updatedUser);

      // For freelancers, redirect directly to edit profile view
      if (role === "provider") {
        localStorage.setItem("require_profile_completion", "true");
        navigate(
          `/${currentLanguage}/dashboard/provider?tab=overview&edit=true`,
        );
      } else {
        // Clients go to normal dashboard
        navigate(`/${currentLanguage}/dashboard/customer`);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      setSelectedRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <SEO
        title={
          <LanguageText
            ru="Выберите роль | QuickHire"
            en="Choose Your Role | QuickHire"
            et="Valige oma roll | QuickHire"
          />
        }
        description={
          <LanguageText
            ru="Выберите свою роль на платформе QuickHire"
            en="Choose your role on the QuickHire platform"
            et="Valige oma roll QuickHire platvormil"
          />
        }
      />

      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <LanguageText
              ru="Выберите тип аккаунта"
              en="Choose your account type"
              et="Valige oma konto tüüp"
            />
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Freelance Option */}
          <CustomCard
            onClick={() => handleRoleSelection("provider")}
            className={`p-8 text-center group ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-blue-500 hover:bg-blue-50"
            } border-2 border-gray-200`}
            hover={!isLoading}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <LanguageText
                  ru="Фрилансер"
                  en="Freelance"
                  et="Vabakutseline"
                />
              </h3>
              <p className="text-gray-600 text-sm">
                <LanguageText
                  ru="Предлагайте услуги и зарабатывайте"
                  en="Offer services and earn money"
                  et="Pakkuge teenuseid ja teenige raha"
                />
              </p>
            </div>
          </CustomCard>

          {/* Client Option */}
          <CustomCard
            onClick={() => handleRoleSelection("customer")}
            className={`p-8 text-center group ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-green-500 hover:bg-green-50"
            } border-2 border-gray-200`}
            hover={!isLoading}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-green-100 rounded-full mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <LanguageText ru="Клиент" en="Client" et="Klient" />
              </h3>
              <p className="text-gray-600 text-sm">
                <LanguageText
                  ru="Находите экспертов и заказывайте услуги"
                  en="Find experts and hire services"
                  et="Leidke eksperte ja palkage teenuseid"
                />
              </p>
            </div>
          </CustomCard>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              <LanguageText
                ru="Настройка аккаунта..."
                en="Setting up your account..."
                et="Konto seadistamine..."
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
