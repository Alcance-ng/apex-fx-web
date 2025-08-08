interface LoadingSpinnerProps {
  text?: string;
  size?: number;
  color?: string;
}

export function LoadingSpinner({
  text = "Loading...",
  size = 12,
  color = "border-lime-500",
}: LoadingSpinnerProps) {
  return (
    <div className="text-center" role="status" aria-live="polite">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color} mx-auto mb-4`}
      ></div>
      <p className="text-lime-600">{text}</p>
    </div>
  );
}
