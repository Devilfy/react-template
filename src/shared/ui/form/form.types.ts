import { z } from "zod";

export interface FormProps<T extends z.ZodType> {
    className?: string;
    fields: FormFieldProps[];
    schema: T;
    submitButton: {
        text: string;
        className?: string;
        isLoading?: boolean;
    };
    onSubmit: (data: z.infer<T>) => void;
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
