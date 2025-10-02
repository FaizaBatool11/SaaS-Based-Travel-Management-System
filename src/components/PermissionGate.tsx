"use client";
import { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";

interface PermissionGateProps {
  required: string;       // Required permission
  children: ReactNode;    // Children jo show karne hain
}

export default function PermissionGate({ required, children }: PermissionGateProps) {
  const allowed = usePermission(required);
  if (!allowed) return null;
  return <>{children}</>;
}
