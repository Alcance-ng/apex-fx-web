import React from "react";

interface AdminLoadingSpinnerProps {
  size?: number;
  color?: string;
  borderWidth?: number;
  text?: string;
  className?: string;
}

export const AdminLoadingSpinner: React.FC<AdminLoadingSpinnerProps> = ({
  size = 48,
  color = "#8b5cf6", // Tailwind purple-600
  borderWidth = 2,
  text = "Loading...",
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div
          className="animate-spin rounded-full mx-auto mb-4"
          style={{
            height: size,
            width: size,
            borderBottom: `${borderWidth}px solid ${color}`,
            borderLeft: `${borderWidth}px solid transparent`,
            borderRight: `${borderWidth}px solid transparent`,
            borderTop: `${borderWidth}px solid transparent`,
          }}
        ></div>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
};
