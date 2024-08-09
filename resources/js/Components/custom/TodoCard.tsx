import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Link, router } from "@inertiajs/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
} from "../ui/alert-dialog";

export default function TodoCard({
    isDone,
    name,
    uuid,
    id,
    link,
}: {
    isDone: boolean;
    name: string;
    uuid?: string;
    id?: string;
    link: boolean;
}) {
    const dispatch = useDispatch();
    const formSchema = z.object({
        done: z.boolean().default(isDone ? true : false),
        kegiatan: z.string().min(1, {
            message: "nama kegiatan tidak boleh kosong",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            done: isDone ? true : false,
            kegiatan: name,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (uuid != undefined) {
            const data = { name: values.kegiatan, uuid: uuid };
            router.patch("/todo", data);
        }
        if (id != undefined) {
            const data = { name: values.kegiatan, id: id };
            router.patch("/subtodo", data);
        }
    };

    const handleDone = () => {
        if (uuid != undefined) {
            const data = { isDone: form.getValues("done"), uuid: uuid };
            router.patch("/todo/done", data);
        }
        if (id != undefined) {
            const data = { isDone: form.getValues("done"), id: id };
            router.patch("/subtodo/done", data);
        }
    };

    const handleDelete = () => {
        if (uuid != undefined) {
            const params = { uuid: uuid };
            router.delete(route("todo.destroy", params));
        }
        if (id != undefined) {
            const params = { id: id };
            router.delete(route("subtodo.destroy", params));
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Form {...form}>
                    <form className="w-10 h-10">
                        <FormField
                            control={form.control}
                            name="done"
                            render={({ field }) => (
                                <FormItem>
                                    <Checkbox
                                        className="w-10 h-10 rounded-full"
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);
                                            handleDone();
                                        }}
                                    />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                {link ? (
                    <Link
                        href={route("todo.show")}
                        method="get"
                        data={{ uuid: uuid }}
                        className={
                            form.watch("done")
                                ? "line-through text-black/50 hover:text-black/70"
                                : "hover:underline"
                        }
                    >
                        {name}
                    </Link>
                ) : (
                    <p
                        className={
                            form.watch("done")
                                ? "line-through text-black/50 hover:text-black/70"
                                : "hover:underline"
                        }
                    >
                        {name}
                    </p>
                )}
            </div>
            <div className="flex gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-blue-100 hover:text-blue-500"
                        >
                            <Pencil className="h-6 w-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="capitalize">
                                edit kegiatan
                            </DialogTitle>
                            <DialogDescription>
                                edit kegiatan yang ini diselesaikan
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
                                        <Button type="submit">ubah</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-100 hover:text-red-500"
                        >
                            <Trash2 className="h-6 w-6" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>hapus kegiatan?</AlertDialogTitle>
                            <p>{name}</p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
