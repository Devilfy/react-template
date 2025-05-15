import type { FieldValues, Resolver } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
    className?: string;
    fields: FormFieldProps[];
    submitButton: {
        text: string;
        className?: string;
        isLoading?: boolean;
    };
    onSubmit: (data: T) => Promise<unknown>;
    resolver?: Resolver<T>;
}

export interface FormFieldProps {
    label?: string;
    className?: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    content?: {
        top?: React.ReactNode;
        left?: React.ReactNode;
    };
    options?: {
        label: string;
        value: string;
    }[];
}
