import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";
import Layout from "./layout";
import { ProtectedRoute } from "./protected-route";
import Header from "@/features/header/header";

export const router = createBrowserRouter([
    {
        element: (
            <Providers>
                <Layout />
            </Providers>
        ),
        children: [
            {
                element: (
                    <>
                        <Header />
                        <ProtectedRoute />
                    </>
                ),
                children: [{}],
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import("@/features/auth/login.page"),
            },
        ],
    },
]);
