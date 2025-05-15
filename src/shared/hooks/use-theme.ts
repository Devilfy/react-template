import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedTheme = localStorage.getItem("theme") as Theme | null;

        const preferredTheme: Theme =
            savedTheme ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        setTheme(preferredTheme);
        document.documentElement.classList.toggle("dark", preferredTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return { theme, toggleTheme };
};
