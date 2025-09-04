export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      {children}
    </div>
  );
}
