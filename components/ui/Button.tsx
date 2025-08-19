import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white shadow-lg hover:from-red-600 hover:via-pink-600 hover:to-yellow-600 focus:ring-yellow-400",
    secondary: "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white hover:from-gray-800 hover:via-black hover:to-gray-900 focus:ring-gray-400",
    outline:
      "border border-red-400 bg-transparent text-red-200 hover:bg-red-900/30 focus:ring-yellow-400",
    danger: "bg-gradient-to-r from-red-700 via-red-900 to-black text-white hover:from-red-800 hover:via-black hover:to-red-900 focus:ring-red-400",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
