import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUser from "@/services/user/model/use-user";
function Layout() {
    const { updateUser, isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            updateUser();
        }
    }, [isAuthenticated]);

    return (
        <main className="min-h-[calc(100vh-64px)] flex flex-col flex-1 bg-background-light dark:bg-background-dark">
            <Outlet />
        </main>
    );
}

export default Layout;
