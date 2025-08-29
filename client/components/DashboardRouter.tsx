import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { useLanguage } from "../lib/LanguageContext";
import CustomerDashboard from "../pages/CustomerDashboard";
import ProviderDashboard from "../pages/ProviderDashboard";

export default function DashboardRouter() {
  const { type } = useParams<{ type: string }>();
  const { user, isAuthenticated } = useAuth();
  const { currentLanguage } = useLanguage();

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={`/${currentLanguage}/login`} replace />;
  }

  // Redirect to correct dashboard based on user type if URL doesn't match
  if (type !== user.accountType) {
    return (
      <Navigate
        to={`/${currentLanguage}/dashboard/${user.accountType}`}
        replace
      />
    );
  }

  // Render appropriate dashboard
  switch (user.accountType) {
    case "provider":
      return <ProviderDashboard />;
    case "customer":
      return <CustomerDashboard />;
    default:
      return <Navigate to={`/${currentLanguage}/`} replace />;
  }
}
