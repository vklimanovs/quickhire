import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  border = false,
  hover = false,
  onClick,
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const baseClasses = "bg-white rounded-lg";
  const borderClasses = border ? "border border-gray-200" : "";
  const hoverClasses = hover
    ? "hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    : "";
  const clickClasses = onClick ? "cursor-pointer" : "";

  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${clickClasses} ${className}`;

  if (onClick) {
    return (
      <div className={cardClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}

// Specialized card variants
export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = "",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}) => (
  <Card className={`text-center ${className}`}>
    {icon && (
      <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
    )}

    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>

    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}

    {trend && (
      <div
        className={`flex items-center justify-center mt-2 text-sm ${
          trend.isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        <span className={trend.isPositive ? "↑" : "↓"} />
        <span className="ml-1">{Math.abs(trend.value)}%</span>
      </div>
    )}
  </Card>
);

export const ProfileCard = ({
  photo,
  name,
  title,
  description,
  actions,
  className = "",
}: {
  photo: string;
  name: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) => (
  <Card className={`text-center ${className}`}>
    <img
      src={photo}
      alt={name}
      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
    />

    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

    {title && <p className="text-gray-600 mt-1">{title}</p>}

    {description && <p className="text-gray-500 text-sm mt-2">{description}</p>}

    {actions && <div className="mt-4">{actions}</div>}
  </Card>
);

export const ActionCard = ({
  title,
  description,
  action,
  actionText,
  className = "",
}: {
  title: string;
  description: string;
  action: () => void;
  actionText: string;
  className?: string;
}) => (
  <Card className={`text-center ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>

    <button
      onClick={action}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {actionText}
    </button>
  </Card>
);
