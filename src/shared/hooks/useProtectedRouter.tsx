"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { tokenStorage } from "@/shared/utils/storage";

export function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.getAccess();

    if (!token) {
      router.replace("/login");
    }
  }, [router]);
}
