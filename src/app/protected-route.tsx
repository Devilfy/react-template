import { useSession } from "@/services/session";
import { ROUTES } from "@/shared/model/routes";
import { Outlet, Navigate } from "react-router-dom";

export function ProtectedRoute() {
    const { session } = useSession();

    if (!session) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return <Outlet />;
}
