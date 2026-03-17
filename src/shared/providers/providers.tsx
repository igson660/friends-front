"use client";

import { ReactNode } from "react";
import { ReactQueryProvider } from "./reactQuery.provider";
import { AuthProvider } from "./auth.providers";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ReactQueryProvider>
      <Toaster position="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}
