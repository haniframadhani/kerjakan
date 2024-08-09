import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        name: z.string().min(1, { message: "nama minimal harus 1 karakter" }),
        email: z.string().email({ message: "alamat email tidak valid" }),
        password: z.string().min(8, { message: "minimal 8 karakter" }),
        password_confirmation: z
            .string()
            .min(8, { message: "minimal 8 karakter" }),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password_confirmation !== password) {
            ctx.addIssue({
                code: "custom",
                message: "konfirmasi kata sandi tidak sama",
                path: ["password_confirmation"],
            });
        }
    });

const Register = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values };
        router.post(route("register"), data);
        form.reset();
    }

    return (
        <>
            <Head title="daftar" />
            <div className="container flex flex-col w-screen h-screen items-center sm:justify-center pt-6 sm:pt-0 gap-2">
                <h1 className="text-4xl w-fit font-bold">kerjakan</h1>
                <div className="w-full sm:max-w-md">
                    <Card>
                        <CardContent className="!p-6">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>nama</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    kata sandi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password_confirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    konfirmasi kata sandi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-start flex-row-reverse">
                                        <Button type="submit">daftar</Button>
                                        <Link href={route("login")}>
                                            <Button
                                                variant="link"
                                                className="text-gray-600"
                                            >
                                                sudah terdaftar?
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Register;
