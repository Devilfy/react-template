import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Outlet />
        </div>
    );
}

export default Layout;
