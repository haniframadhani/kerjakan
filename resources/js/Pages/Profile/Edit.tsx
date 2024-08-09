import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import UpdateInformation from "./UpdateInformation";
import UpdatePassword from "./UpdatePassword";
import DeleteUser from "./DeleteUser";
import { useAppSelector } from "@/redux/app/hook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, turnOff } from "@/redux/features/alertSlice";
import { useToast } from "@/Components/ui/use-toast";

type Flash = {
    message?: string | null;
};

export default function Profile({
    auth,
    flash,
}: PageProps<{ auth: PageProps; flash: Flash }>) {
    const dispatch = useDispatch();
    const showAlert = useAppSelector((state) => state.alert.show);
    const alertMessage = useAppSelector((state) => state.alert.message);
    const { toast } = useToast();
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
            <Head title="profil" />
            <div className="container my-3">
                <a href="/">
                    <Button variant="ghost">
                        <ChevronLeft className="w-6 h-6 mr-1" />
                        kembali
                    </Button>
                </a>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 my-3">
                    <UpdateInformation
                        email={auth.user.email}
                        name={auth.user.name}
                    />
                    <UpdatePassword />
                    <DeleteUser />
                </div>
            </div>
        </>
    );
}
