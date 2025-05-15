import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { FieldValues, Path, Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { FormFieldProps, FormProps } from "./form.types";
import { cn } from "@/shared/lib/css";
import { Button } from "../kit/button";
import { Input } from "../kit/input";
import { Textarea } from "../kit/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../kit/select";

const FormBuilder = <T extends FieldValues>({
    fields,
    className,
    submitButton,
    onSubmit,
    resolver,
}: FormProps<T> & { resolver?: Resolver<T> }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({ resolver });

    const [showPassword, setShowPassword] = useState(false);

    const inputStyles = cn(
        "w-full",
        "bg-input-light dark:bg-input-dark",
        "text-text-light dark:text-text-dark",
        "border border-input-border-light dark:border-input-border-dark",
        "focus:border-input-focus-light dark:focus:border-input-focus-dark",
        "focus:ring-input-focus-light/20 dark:focus:ring-input-focus-dark/20",
        "placeholder:text-input-placeholder-light dark:placeholder:text-input-placeholder-dark",
        "transition-colors duration-200"
    );

    const renderField = (field: FormFieldProps) => {
        return (
            <div
                key={field.name}
                className={cn("space-y-2", className)}>
                <div className="w-full">
                    {field.label && (
                        <label
                            htmlFor={field.name}
                            className="text-text-light dark:text-text-dark font-medium">
                            {field.label}
                        </label>
                    )}
                </div>
                {(() => {
                    switch (field.type) {
                        case "text":
                        case "email":
                        case "number":
                            return (
                                <Input
                                    type={field.type}
                                    id={field.name}
                                    {...register(field.name as Path<T>, {
                                        required: field.required,
                                    })}
                                    placeholder={field.placeholder}
                                    disabled={field.disabled}
                                    autoFocus={field.autoFocus}
                                    className={inputStyles}
                                />
                            );
                        case "password":
                            return (
                                <div className="relative">
                                    <Input
                                        type={
                                            field.type === "password"
                                                ? showPassword
                                                    ? "text"
                                                    : "password"
                                                : field.type
                                        }
                                        id={field.name}
                                        {...register(field.name as Path<T>, {
                                            required: field.required,
                                        })}
                                        placeholder={field.placeholder}
                                        disabled={field.disabled}
                                        autoFocus={field.autoFocus}
                                        aria-invalid={
                                            errors[field.name as Path<T>] ? "true" : "false"
                                        }
                                        className={inputStyles}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={cn(
                                            "absolute right-3 top-1/2 -translate-y-1/2",
                                            "text-input-placeholder-light dark:text-input-placeholder-dark",
                                            "hover:text-text-light/70 dark:hover:text-text-dark/70",
                                            "transition-colors duration-200",
                                            "cursor-pointer"
                                        )}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            );
                        case "checkbox":
                            return (
                                <Input
                                    type="checkbox"
                                    id={field.name}
                                    {...register(field.name as Path<T>, {
                                        required: field.required,
                                    })}
                                    disabled={field.disabled}
                                    className={cn(
                                        "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
                                        field.className
                                    )}
                                    aria-invalid={errors[field.name as Path<T>] ? "true" : "false"}
                                />
                            );
                        case "select":
                            return (
                                <Select
                                    {...register(field.name as Path<T>, {
                                        required: field.required,
                                    })}
                                    disabled={field.disabled}
                                    aria-invalid={errors[field.name as Path<T>] ? "true" : "false"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {field.options?.map((option) => (
                                                <SelectItem
                                                    key={option.label}
                                                    value={option.label}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            );

                        case "textarea":
                            return (
                                <Textarea
                                    id={field.name}
                                    {...register(field.name as Path<T>, {
                                        required: field.required,
                                    })}
                                    className={cn(inputStyles, "min-h-[60px]")}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(className)}>
            <div className="space-y-4">{fields.map(renderField)}</div>
            <Button
                type="submit"
                className={cn(
                    submitButton.className,
                    "w-full mt-6 h-10 bg-primary-light dark:bg-primary-dark text-white hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
                )}
                disabled={submitButton.isLoading}>
                {submitButton.isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    submitButton.text
                )}
            </Button>
        </form>
    );
};

export default FormBuilder;
