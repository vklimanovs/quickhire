import React from "react";
import LanguageText from "../common/LanguageText";

interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: (e?: React.MouseEvent | React.FormEvent) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
  // For language text
  text?: {
    ru: string;
    en: string;
    et: string;
  };
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  className = "",
  children,
  text,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderContent = () => {
    if (text) {
      return <LanguageText ru={text.ru} en={text.en} et={text.et} />;
    }
    return children;
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      );
    }
    return icon;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {iconPosition === "left" && renderIcon()}
      {renderContent()}
      {iconPosition === "right" && icon && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}

// Predefined button variants for common use cases
export const ActionButton = ({
  text,
  ...props
}: Omit<ButtonProps, "variant">) => (
  <Button variant="primary" text={text} {...props} />
);

export const DangerButton = ({
  text,
  ...props
}: Omit<ButtonProps, "variant">) => (
  <Button variant="danger" text={text} {...props} />
);

export const SecondaryButton = ({
  text,
  ...props
}: Omit<ButtonProps, "variant">) => (
  <Button variant="secondary" text={text} {...props} />
);

export const OutlineButton = ({
  text,
  ...props
}: Omit<ButtonProps, "variant">) => (
  <Button variant="outline" text={text} {...props} />
);
