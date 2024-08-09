import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    remember: z.boolean().default(false),
    email: z.string().email({ message: "alamat email tidak valid" }),
    password: z.string(),
});

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            remember: false,
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values };
        router.post(route("login"), data);
        form.reset();
    }

    return (
        <>
            <Head title="masuk" />
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">
                                                    email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">
                                                    kata sandi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="remember"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-1">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className="!mt-0 text-gray-600">
                                                    ingat saya
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-start flex-row-reverse">
                                        <Button type="submit">masuk</Button>
                                        <Link href={route("register")}>
                                            <Button
                                                variant="link"
                                                className="text-gray-600"
                                            >
                                                buat akun
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

export default Login;
