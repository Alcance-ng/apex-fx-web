import Link from "next/link";

export function ForgotPasswordHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="text-center mb-8">
      <Link
        href="/"
        className="text-2xl font-bold text-lime-700 mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
      >
        Apex FX
      </Link>
      {icon && (
        <div className="w-16 h-16 bg-lime-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-base text-gray-700">{subtitle}</p>}
    </div>
  );
}

export function ForgotPasswordError({ error }: { error: string }) {
  if (!error) return null;
  return (
    <div
      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
      role="alert"
    >
      <p className="text-red-600 text-base">{error}</p>
    </div>
  );
}
