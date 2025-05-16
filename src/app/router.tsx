import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";
import Layout from "./layout";
import { ProtectedRoute } from "./protected-route";
import { Header } from "@/features/header/header";

export const router = createBrowserRouter([
    {
        element: (
            <Providers>
                <Header />
                <Layout />
            </Providers>
        ),
        children: [
            {
                element: (
                    <>
                        <ProtectedRoute />
                    </>
                ),
                children: [
                    {
                        path: ROUTES.HOME,
                        element: <p>Home</p>,
                    },
                    {
                        path: ROUTES.PROFILE,
                        lazy: () => import("@/features/profile/profile.page"),
                    },
                ],
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import("@/features/auth/login.page"),
            },
            {
                path: ROUTES.REGISTER,
                lazy: () => import("@/features/auth/register.page"),
            },
            {
                path: ROUTES.NOT_FOUND,
                lazy: () => import("@/features/not-found/not-found.page"),
            },
            // {
            //     path: ROUTES.HOME,
            //     loader: () => redirect(ROUTES.BOARDS),
            // },
        ],
    },
]);
