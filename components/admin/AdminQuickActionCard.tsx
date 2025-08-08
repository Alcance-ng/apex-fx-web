import React from "react";

interface AdminQuickActionCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function AdminQuickActionCard({
  icon,
  label,
  description,
  color,
  href,
  onClick,
  ariaLabel,
}: AdminQuickActionCardProps) {
  const baseClass = `flex items-center p-4 border-2 border-dashed border-purple-700 rounded-lg hover:border-${color}-400 hover:bg-${color}-900/40 focus-visible:ring-2 focus-visible:ring-${color}-400 transition-colors outline-none`;
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
