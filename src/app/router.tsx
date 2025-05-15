import { ROUTES } from "@/shared/model/routes";
import { createBrowserRouter } from "react-router-dom";
import App from "./app";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: ROUTES.LOGIN,
                lazy: () => import("@/features/auth/login.page"),
            },
        ],
    },
]);
