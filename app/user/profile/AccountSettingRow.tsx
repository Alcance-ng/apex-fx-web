import React from "react";

interface AccountSettingRowProps {
  title: string;
  description: string;
  control: React.ReactNode;
  borderTop?: boolean;
  danger?: boolean;
}

export function AccountSettingRow({
  title,
  description,
  control,
  borderTop = false,
  danger = false,
}: AccountSettingRowProps) {
  return (
    <div
      className={`flex items-center justify-between ${
        borderTop ? "border-t pt-6 mt-2" : ""
      }`}
    >
      <div>
        <h3
          className={`text-sm font-medium ${
            danger ? "text-red-700" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p className={`text-sm ${danger ? "text-red-600" : "text-gray-500"}`}>
          {description}
        </p>
      </div>
      {control}
    </div>
  );
}
