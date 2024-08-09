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
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "nama minimal harus 1 karakter",
    }),
    email: z.string().email({ message: "alamat email tidak valid" }),
});

type UpdateInformationProp = {
    name: string;
    email: string;
};

const UpdateInformation = ({ name, email }: UpdateInformationProp) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            email: email,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values };
        router.patch(route("profile.update"), data);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>informasi profil</CardTitle>
                <CardDescription>
                    perbarui informasi profil akun anda dan alamat email.
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john doe"
                                            {...field}
                                        />
                                    </FormControl>
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
                                            placeholder="johndoe@example.com"
                                            {...field}
                                        />
                                    </FormControl>
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

export default UpdateInformation;
