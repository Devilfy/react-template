import "react-router-dom";

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/profile/:id",
    NOT_FOUND: "*",
} as const;

export type PathParams = {
    [ROUTES.PROFILE]: {
        id: string;
    };
};

declare module "react-router-dom" {
    interface Register {
        params: PathParams;
    }
}
