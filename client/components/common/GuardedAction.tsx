import React, { ReactElement, cloneElement } from "react";
import { Lock } from "lucide-react";

interface GuardedActionProps {
  isAllowed: boolean;
  onRestricted: () => void;
  intent?:
    | "view-profile"
    | "book-consultation"
    | "post-task"
    | "message"
    | "general";
  children: ReactElement;
  showLockIcon?: boolean;
  disabledClassName?: string;
}

export default function GuardedAction({
  isAllowed,
  onRestricted,
  intent = "general",
  children,
  showLockIcon = true,
  disabledClassName,
}: GuardedActionProps) {
  if (isAllowed) {
    return children;
  }

  // Create a disabled version of the child element
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRestricted();
  };

  const defaultDisabledClasses = "opacity-60 cursor-not-allowed";
  const disabledClasses = disabledClassName || defaultDisabledClasses;

  // Clone the child element with disabled styling and click handler
  const disabledChild = cloneElement(children, {
    onClick: handleClick,
    className: `${children.props.className || ""} ${disabledClasses}`.trim(),
    disabled: true,
    // Remove any href to prevent navigation
    href: undefined,
    to: undefined,
  });

  // If it's a button or similar element, add lock icon
  if (
    showLockIcon &&
    (children.type === "button" || children.props.className?.includes("btn"))
  ) {
    return cloneElement(disabledChild, {
      children: (
        <span className="flex items-center justify-center">
          <Lock className="h-4 w-4 mr-2" />
          {children.props.children}
        </span>
      ),
    });
  }

  return disabledChild;
}
