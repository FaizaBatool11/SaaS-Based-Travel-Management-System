// components/ProtectedClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProtectedProps {
  required?: string;      // permission ka naam (optional bhi ho sakta hai)
  children: ReactNode;    // React children
}

export default function Protected({ required, children }: ProtectedProps) {
  const { permissions, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (required && !permissions.includes(required)) {
      router.replace("/403"); // ya koi fallback page
    }
  }, [loading, permissions, required, router]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
