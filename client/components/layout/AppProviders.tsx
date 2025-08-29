import React from "react";
import { LanguageProvider } from "../../lib/LanguageContext";
import { AuthProvider } from "../../lib/AuthContext";
import { SubscriptionProvider } from "../../lib/SubscriptionContext";
import { NotificationProvider } from "../../lib/NotificationContext";
import { ChatProvider } from "../../lib/ChatContext";
import { ProviderProvider } from "../../lib/ProviderContext";
import { CustomerProvider } from "../../lib/CustomerContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "../../pages/Index";
import NotFound from "../../pages/NotFound";
import PlaceholderPage from "../modals/PlaceholderPage";
import BrowseProviders from "../../pages/BrowseProviders";
import BrowseConsultations from "../../pages/BrowseConsultations";
import BrowseTasks from "../../pages/BrowseTasks";
import ProviderProfile from "../../pages/ProviderProfile";
import TaskDetail from "../../pages/TaskDetail";
import ConsultationDetail from "../../pages/ConsultationDetail";
import Pricing from "../../pages/Pricing";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import VerifyEmail from "../../pages/VerifyEmail";
import ChooseRole from "../../pages/ChooseRole";
import DashboardRouter from "./DashboardRouter";
import ChatWidget from "../common/ChatWidget";
import CreateTask from "../../pages/CreateTask";
import CategoryPage from "../../pages/CategoryPage";
import NotificationSettings from "../../pages/NotificationSettings";
import ForgotPassword from "../../pages/ForgotPassword";

import SubscriptionModalWrapper from "../subscription/SubscriptionModalWrapper";

export default function AppProviders() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SubscriptionProvider key="subscription-provider">
          <NotificationProvider>
            <ChatProvider>
              <ProviderProvider>
                <CustomerProvider>
                  <Routes>
                    {/* Redirect root to Estonian */}
                    <Route path="/" element={<Navigate to="/et" replace />} />

                    {/* Estonian routes */}
                    <Route path="/et" element={<Index />} />
                    <Route path="/et/providers" element={<BrowseProviders />} />
                    <Route
                      path="/et/consultations"
                      element={<BrowseConsultations />}
                    />
                    <Route
                      path="/et/konsultatsioonid"
                      element={<BrowseConsultations />}
                    />
                    <Route path="/et/tasks" element={<BrowseTasks />} />
                    <Route path="/et/ulesanded" element={<BrowseTasks />} />
                    <Route path="/et/pricing" element={<Pricing />} />
                    <Route path="/et/hinnakiri" element={<Pricing />} />
                    <Route
                      path="/et/provider/:id"
                      element={<ProviderProfile />}
                    />
                    <Route path="/et/task/:id" element={<TaskDetail />} />
                    <Route
                      path="/et/consultation/:id"
                      element={<ConsultationDetail />}
                    />
                    <Route path="/et/create-task" element={<CreateTask />} />
                    <Route path="/et/login" element={<Login />} />
                    <Route path="/et/signup" element={<SignUp />} />
                    <Route path="/et/verify-email" element={<VerifyEmail />} />
                    <Route
                      path="/et/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/et/choose-role" element={<ChooseRole />} />
                    <Route
                      path="/et/dashboard/:type"
                      element={<DashboardRouter />}
                    />
                    <Route
                      path="/et/settings/notifications"
                      element={<NotificationSettings />}
                    />

                    {/* English routes */}
                    <Route path="/en" element={<Index />} />
                    <Route path="/en/providers" element={<BrowseProviders />} />
                    <Route
                      path="/en/consultations"
                      element={<BrowseConsultations />}
                    />
                    <Route path="/en/tasks" element={<BrowseTasks />} />
                    <Route path="/en/pricing" element={<Pricing />} />
                    <Route
                      path="/en/provider/:id"
                      element={<ProviderProfile />}
                    />
                    <Route path="/en/task/:id" element={<TaskDetail />} />
                    <Route
                      path="/en/consultation/:id"
                      element={<ConsultationDetail />}
                    />
                    <Route path="/en/create-task" element={<CreateTask />} />
                    <Route path="/en/login" element={<Login />} />
                    <Route path="/en/signup" element={<SignUp />} />
                    <Route path="/en/verify-email" element={<VerifyEmail />} />
                    <Route
                      path="/en/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/en/choose-role" element={<ChooseRole />} />
                    <Route
                      path="/en/dashboard/:type"
                      element={<DashboardRouter />}
                    />
                    <Route
                      path="/en/settings/notifications"
                      element={<NotificationSettings />}
                    />

                    {/* Russian routes */}
                    <Route path="/ru" element={<Index />} />
                    <Route path="/ru/providers" element={<BrowseProviders />} />
                    <Route
                      path="/ru/поставщики"
                      element={<BrowseProviders />}
                    />
                    <Route
                      path="/ru/consultations"
                      element={<BrowseConsultations />}
                    />
                    <Route
                      path="/ru/консультации"
                      element={<BrowseConsultations />}
                    />
                    <Route path="/ru/tasks" element={<BrowseTasks />} />
                    <Route path="/ru/задачи" element={<BrowseTasks />} />
                    <Route path="/ru/pricing" element={<Pricing />} />
                    <Route path="/ru/цены" element={<Pricing />} />
                    <Route
                      path="/ru/provider/:id"
                      element={<ProviderProfile />}
                    />
                    <Route path="/ru/task/:id" element={<TaskDetail />} />
                    <Route
                      path="/ru/consultation/:id"
                      element={<ConsultationDetail />}
                    />
                    <Route path="/ru/create-task" element={<CreateTask />} />
                    <Route path="/ru/login" element={<Login />} />
                    <Route path="/ru/signup" element={<SignUp />} />
                    <Route path="/ru/verify-email" element={<VerifyEmail />} />
                    <Route
                      path="/ru/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/ru/choose-role" element={<ChooseRole />} />
                    <Route
                      path="/ru/dashboard/:type"
                      element={<DashboardRouter />}
                    />
                    <Route
                      path="/ru/settings/notifications"
                      element={<NotificationSettings />}
                    />

                    {/* Placeholder pages for all languages */}
                    <Route
                      path="/:lang/create-task"
                      element={
                        <PlaceholderPage
                          title="Create Task"
                          description="Placeholder for task creation page."
                        />
                      }
                    />
                    <Route
                      path="/:lang/categories"
                      element={
                        <PlaceholderPage
                          title="Categories"
                          description="Placeholder for categories page."
                        />
                      }
                    />
                    <Route
                      path="/:lang/category/:categoryName"
                      element={<CategoryPage />}
                    />
                    <Route
                      path="/:lang/about"
                      element={
                        <PlaceholderPage
                          title="About"
                          description="Placeholder for about page."
                        />
                      }
                    />
                    <Route
                      path="/:lang/contact"
                      element={
                        <PlaceholderPage
                          title="Contact"
                          description="Placeholder for contact page."
                        />
                      }
                    />
                    <Route
                      path="/:lang/terms"
                      element={
                        <PlaceholderPage
                          title="Terms"
                          description="Placeholder for terms page."
                        />
                      }
                    />
                    <Route
                      path="/:lang/privacy"
                      element={
                        <PlaceholderPage
                          title="Privacy"
                          description="Placeholder for privacy page."
                        />
                      }
                    />

                    {/* Legacy URL redirects */}
                    <Route
                      path="/browse-providers"
                      element={<Navigate to="/et/providers" replace />}
                    />
                    <Route
                      path="/browse-consultations"
                      element={<Navigate to="/et/consultations" replace />}
                    />
                    <Route
                      path="/browse-tasks"
                      element={<Navigate to="/et/tasks" replace />}
                    />
                    <Route
                      path="/pricing"
                      element={<Navigate to="/et/pricing" replace />}
                    />
                    <Route
                      path="/provider/:id"
                      element={<Navigate to="/et/provider/:id" replace />}
                    />
                    <Route
                      path="/task/:id"
                      element={<Navigate to="/et/task/:id" replace />}
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ChatWidget />
                  <SubscriptionModalWrapper />
                </CustomerProvider>
              </ProviderProvider>
            </ChatProvider>
          </NotificationProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
