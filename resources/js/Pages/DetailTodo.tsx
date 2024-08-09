import TodoCard from "@/Components/custom/TodoCard";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
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
import { useToast } from "@/Components/ui/use-toast";
import { useAppSelector } from "@/redux/app/hook";
import { message, turnOff } from "@/redux/features/alertSlice";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

type Todo = {
    isDone: boolean;
    name: string;
    uuid?: string;
    id?: string;
};

type Flash = {
    message?: string | null;
};

const formSchema = z.object({
    kegiatan: z.string().min(1, {
        message: "nama kegiatan tidak boleh kosong",
    }),
});

const Detail = ({
    todo,
    subtodo,
    flash,
}: PageProps<{ todo: Todo; subtodo: Todo[]; flash?: Flash }>) => {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            kegiatan: "",
        },
    });
    const { toast } = useToast();
    const showAlert = useAppSelector((state) => state.alert.show);
    const alertMessage = useAppSelector((state) => state.alert.message);
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = { name: values.kegiatan, todo_uuid: todo.uuid };
        router.post("/subtodo", data);
        form.reset();
    };

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
            <Head title={todo.name} />
            <div className="container my-3">
                <a href="/">
                    <Button variant="ghost">
                        <ChevronLeft className="w-6 h-6 mr-1" />
                        kembali
                    </Button>
                </a>
                <h1 className="text-2xl font-medium my-3">{todo.name}</h1>
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
                                            <FormLabel>nama kegiatan</FormLabel>
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
                                        <Button type="submit">tambah</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <div className="grid gap-4 mt-3">
                    {subtodo.length > 0 ? (
                        subtodo.map((data: Todo) => {
                            return (
                                <Card key={data.id}>
                                    <CardContent className="bg-slate-50/30 py-3">
                                        <TodoCard
                                            name={data.name}
                                            isDone={data.isDone}
                                            id={data.id}
                                            link={false}
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
};

export default Detail;
