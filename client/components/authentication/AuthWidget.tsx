import React, { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";
import GoogleSignIn from "./GoogleSingIn";
import GoogleRoleSelectionModal from "./GoogleRoleSelectionModal";

interface AuthWidgetProps {
  className?: string;
}

export default function AuthWidget({ className = "" }: AuthWidgetProps) {
  const { currentLanguage } = useLanguage();
  const { user, isAuthenticated, isLoading, logout, loginWithGoogle } =
    useAuth();

  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);

  const handleLogin = () => {
    // This component will just use the "customer" login for simplicity
    loginWithGoogle("customer");
  };

  if (isLoading) {
    return (
      <div
        className={`auth-widget ${className}`}
        style={{ padding: "12px", textAlign: "center" }}
      >
        {currentLanguage === "ru"
          ? "Загрузка..."
          : currentLanguage === "en"
            ? "Loading..."
            : "Laadimine..."}
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className={`auth-widget ${className}`}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          {/* We don't have a picture from our new user object, so we'll skip it */}
          <div>
            <div style={{ fontWeight: "500", fontSize: "14px" }}>
              {`${user.firstName} ${user.lastName}`.trim()}
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
              {user.email}
            </div>
          </div>
        </div>

        <button
          onClick={() => logout()}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#b91c1c")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#dc2626")}
        >
          {currentLanguage === "ru"
            ? "Выйти"
            : currentLanguage === "en"
              ? "Log out"
              : "Logi välja"}
        </button>
      </div>
    );
  }

  return (
    <div className={`auth-widget ${className}`}>
      <GoogleSignIn
        onSuccess={(userData) => {
          console.log(
            "AuthWidget: Google Sign-In successful for returning user:",
            userData,
          );
          // Returning user is already authenticated, no action needed
        }}
        onNewUser={(userData) => {
          console.log(
            "AuthWidget: Google Sign-In successful for new user:",
            userData,
          );
          setGoogleUserData(userData);
          setShowRoleSelection(true);
        }}
        onError={(error) => {
          console.error("AuthWidget: Google Sign-In failed:", error);
        }}
      />

      {/* Google Role Selection Modal */}
      {showRoleSelection && googleUserData && (
        <GoogleRoleSelectionModal
          isOpen={showRoleSelection}
          onClose={() => setShowRoleSelection(false)}
          userData={googleUserData}
        />
      )}
    </div>
  );
}
