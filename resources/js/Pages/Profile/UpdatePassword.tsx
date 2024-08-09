import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
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
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
    .object({
        current_password: z.string(),
        password: z.string().min(8, {
            message: "kata sandi minimal harus 8 karakter",
        }),
        password_confirmation: z.string().min(8, {
            message: "kata sandi minimal harus 8 karakter",
        }),
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

const UpdatePassword = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values };
        router.put(route("password.update"), data, {
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onError: (errors) => {
                if (errors.password) {
                    console.log("password baru salah");
                    form.resetField("password");
                    form.resetField("password_confirmation");
                    form.setFocus("password");
                }
                if (errors.current_password) {
                    console.log("password saat ini salah");
                    form.setError(
                        "current_password",
                        {
                            type: "manual",
                            message: "password saat ini salah",
                        },
                        { shouldFocus: true }
                    );
                    console.log(form.formState.errors.current_password);
                    form.setValue("current_password", "");
                }
            },
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>perbarui kata sandi</CardTitle>
                <CardDescription>
                    pastikan akun anda menggunakan kata sandi yang panjang dan
                    acak agar tetap aman.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>kata sandi saat ini</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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
                                    <FormLabel>kata sandi baru</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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
                                    <FormLabel>konfirmasi kata sandi</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">simpan</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UpdatePassword;
