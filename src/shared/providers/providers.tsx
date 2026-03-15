"use client";

import { ReactNode } from "react";
import { ReactQueryProvider } from "./reactQuery.provider";
import { AuthProvider } from "./auth.providers";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}
