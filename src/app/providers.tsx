import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { UserProvider } from "@/services/user/context/user.context";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster richColors />
            </QueryClientProvider>
        </UserProvider>
    );
}
