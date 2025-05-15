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

    const renderField = (field: FormFieldProps) => {
        return (
            <div
                key={field.name}
                className={cn("space-y-2", className)}>
                {field.label && <label htmlFor={field.name}>{field.label}</label>}
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
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-text/60">
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
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
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
                className={cn(submitButton.className)}
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
