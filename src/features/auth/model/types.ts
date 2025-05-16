import i18n from "@/shared/lib/i18n";
import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: i18n.t("input.required") })
        .email({ message: i18n.t("input.email_invalid") }),
    password: z
        .string()
        .min(6, { message: i18n.t("input.min", { count: 6 }) })
        .max(32, { message: i18n.t("input.max", { count: 32 }) }),
});

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, { message: i18n.t("input.required") })
        .email({ message: i18n.t("input.email_invalid") }),
    password: z
        .string()
        .min(6, { message: i18n.t("input.min", { count: 6 }) })
        .max(32, { message: i18n.t("input.max", { count: 32 }) }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
