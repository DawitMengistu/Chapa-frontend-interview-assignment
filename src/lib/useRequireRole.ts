import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export function useRequireRole(requiredRole: string) {
  const router = useRouter();
  const { role, hydrated } = useUser();

  useEffect(() => {
    if (!hydrated) return;

    if (!role) {
      toast.error("Please login first.");
      router.push("/login");
    } else if (role !== requiredRole) {
      toast.error("Access denied.");
      router.push(`/dashboard/${role}`);
    }
  }, [role, hydrated, router, requiredRole]);

  // Only allow rendering if hydrated and role matches
  return hydrated && role === requiredRole;
}
