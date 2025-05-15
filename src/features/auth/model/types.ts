import i18n from "@/shared/lib/i18n";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: i18n.t("input.required") }),
    password: z
        .string()
        .min(6, { message: i18n.t("input.min") })
        .max(32, { message: i18n.t("input.max") }),
});

export const registerSchema = z.object({
    email: z.string().min(1, { message: i18n.t("input.required") }),
    password: z
        .string()
        .min(6, { message: i18n.t("input.min") })
        .max(32, { message: i18n.t("input.max") }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
