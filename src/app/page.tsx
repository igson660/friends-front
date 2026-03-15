import { useProtectedRoute } from "@/shared/hooks/useProtectedRouter";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/login");
}
