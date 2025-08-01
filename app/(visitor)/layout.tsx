"use client";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function VisitorAuthRedirect({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/user/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  return <>{children}</>;
}

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <VisitorAuthRedirect>{children}</VisitorAuthRedirect>
    </SessionProvider>
  );
}
