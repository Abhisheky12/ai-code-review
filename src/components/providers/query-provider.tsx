"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientRef = useRef(new QueryClient());

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}