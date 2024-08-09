import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ChevronDown, CircleUser, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TodoCard from "@/Components/custom/TodoCard";
import { useAppSelector } from "@/redux/app/hook";
import { useDispatch } from "react-redux";
import { message, turnOff } from "@/redux/features/alertSlice";
import { useToast } from "@/Components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

type TodoAll = {
    data: TodoData[];
    links: LinksPagination;
    meta: Meta;
};

type TodoData = {
    uuid: string;
    isDone: boolean;
    name: string;
};

type LinksPagination = {
    first: string;
    last: string;
    next: string;
    prev: string;
};

type Meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLinks[];
    per_page: number;
    to: number;
    total: number;
};

type MetaLinks = {
    active: boolean;
    label: string;
    url: string;
};

type Flash = {
    message?: string | null;
};

const formSchema = z.object({
    kegiatan: z.string().min(1, {
        message: "nama kegiatan tidak boleh kosong",
    }),
});

export default function Homepage({
    title,
    todo,
    flash,
    auth,
}: PageProps<{
    title: string;
    todo: TodoAll;
    flash?: Flash;
    auth: PageProps;
}>) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kegiatan: "",
        },
    });
    const showAlert = useAppSelector((state) => state.alert.show);
    const alertMessage = useAppSelector((state) => state.alert.message);
    const [clock, setClock] = useState(DateTime.now().setZone("system"));
    const dispatch = useDispatch();
    const { toast } = useToast();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = { name: values.kegiatan };
        router.post("/todo", data);
        form.reset();
    };

    useEffect(() => {
        const interval = setInterval(
            () => setClock(DateTime.now().setZone("system")),
            1000
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        dispatch(message(flash?.message));
    }, [flash]);

    useEffect(() => {
        if (showAlert) {
            toast({
                description: alertMessage,
            });
            dispatch(turnOff());
        }
    }, [showAlert]);

    return (
        <>
            <Head title={title} />
            <div className="container my-3">
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-black/70">
                            {auth.user.name}
                            <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="text-black/70">
                            <Link href={route("profile.edit")}>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <CircleUser className="w-5 h-5" />
                                    profil
                                </DropdownMenuItem>
                            </Link>
                            <Link href={route("logout")} method="post">
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <LogOut className="w-5 h-5" />
                                    keluar
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h1 className="text-2xl font-bold">
                    Apa yang ingin diselesaikan hari ini?
                </h1>
                <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center lg:justify-between mb-3">
                    <div>
                        <h2 className="text-2xl font-medium tabular-nums">
                            {clock.setLocale("id").toFormat("HH:mm:ss ZZZZ")}
                        </h2>
                        <p>
                            {clock.setLocale("id").toFormat("EEEE, dd MMMM y")}
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="capitalize">
                                <Plus className="mr-2 w-5 h-5" />
                                tambah kegiatan
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="capitalize">
                                    tambah kegiatan
                                </DialogTitle>
                                <DialogDescription>
                                    tambahkan kegiatan yang ini diselesaikan
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="kegiatan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    nama kegiatan
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="mengerjakan sesuatu"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                            >
                                                batal
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button type="submit">
                                                tambah
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid gap-4">
                    {todo.data.length > 0 ? (
                        todo.data.map((data: TodoData) => {
                            return (
                                <Card key={data.uuid}>
                                    <CardContent className="bg-slate-50/30 py-3">
                                        <TodoCard
                                            name={data.name}
                                            isDone={data.isDone}
                                            uuid={data.uuid}
                                            link={true}
                                            key={data.uuid}
                                        />
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="flex justify-center items-center h-auto">
                            <p>belum ada kegiatan</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
