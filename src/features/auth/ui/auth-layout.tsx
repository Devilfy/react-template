import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/shared/ui/kit/card";
import React from "react";

export function AuthLayout({
    form,
    title,
    description,
    footerText,
}: {
    form: React.ReactNode;
    title: string;
    description: string;
    footerText: React.ReactNode;
}) {
    return (
        <main className="grow flex flex-col pt-[200px] items-center">
            <Card className="w-full max-w-[450px] bg-form">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>{form}</CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary dark:[&_a]:text-primary">
                        {footerText}
                    </p>
                </CardFooter>
            </Card>
        </main>
    );
}
