import { useTheme } from "@/shared/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "../kit/button";

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            size="icon"
            onClick={toggleTheme}
            className="group text-sm font-medium text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark bg-transparent border border-accent-light/40 dark:border-accent-dark/40 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-all duration-200 rounded-lg">
            {theme === "light" ? (
                <Moon className="h-5 w-5 transition-colors duration-200 group-hover:text-accent-light dark:group-hover:text-accent-dark" />
            ) : (
                <Sun className="h-5 w-5 transition-colors duration-200 group-hover:text-accent-light dark:group-hover:text-accent-dark" />
            )}
        </Button>
    );
};
