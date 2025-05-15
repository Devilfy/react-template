import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <main className="min-h-[calc(100vh-64px)] flex flex-col flex-1 bg-background-light dark:bg-background-dark">
            <Outlet />
        </main>
    );
}

export default Layout;
