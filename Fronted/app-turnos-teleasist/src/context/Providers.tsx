"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

export function ContextProvider({ children }: ProvidersProps) {
    return (

        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

    );
}