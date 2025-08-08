import React from "react";

interface AdminQuickActionCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  hoverClass?: string;
}

export default function AdminQuickActionCard({
  icon,
  label,
  description,
  href,
  onClick,
  ariaLabel,
  hoverClass = "hover:scale-105 hover:shadow-xl",
}: AdminQuickActionCardProps) {
  const baseClass = `flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg transition-colors outline-none ${hoverClass}`;
  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        tabIndex={0}
        aria-label={ariaLabel || label}
      >
        {icon}
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-purple-300">{description}</p>
        </div>
      </a>
    );
  }
  return (
    <button
      className={baseClass}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {icon}
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-purple-300">{description}</p>
      </div>
    </button>
  );
}
