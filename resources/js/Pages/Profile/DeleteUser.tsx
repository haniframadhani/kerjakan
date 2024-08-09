import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
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

const formSchema = z.object({
    password: z.string(),
});

const DeleteUser = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        const params = { ...values };
        router.delete(route("profile.destroy", params), {
            preserveScroll: true,
            onError: () => {
                form.setError(
                    "password",
                    {
                        type: "manual",
                        message: "password salah",
                    },
                    { shouldFocus: true }
                );
                form.setValue("password", "");
            },
            onFinish: () => form.reset(),
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>hapus akun</CardTitle>
                <CardDescription>
                    setelah akun anda dihapus, semua sumber daya dan datanya
                    akan dihapus secara permanen.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="uppercase">
                            hapus akun
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                apakah anda yakin ingin menghapus akun anda?
                            </DialogTitle>
                            <DialogDescription>
                                setelah akun anda dihapus, semua sumber daya dan
                                datanya akan dihapus secara permanen.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>kata sandi</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                        >
                                            batal
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="uppercase"
                                    >
                                        hapus akun
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default DeleteUser;
