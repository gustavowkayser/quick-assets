
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { FormEvent, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { createWallet, deleteWalletById } from "@/app/actions/actions";
import { toast } from "sonner";
import { revalidate } from "@/app/actions/routing";
import { redirect, usePathname, useRouter } from "next/navigation";

function DeleteWalletModal({ closeModal, walletId }: { closeModal: any, walletId: string }) {
    const { userId, isLoaded } = useAuth();
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname()

    const onSubmit = async () => {
        if (!isLoaded) return;

        const id = walletId;

        await deleteWalletById(id)

        toast('The wallet was deleted')

        // router.push('/dashboard')
        await revalidate('/')
        redirect('/dashboard')
    }

    return (
      <div className="fixed inset-0 backdrop-blur-[2px] bg-background/30 overflow-y-auto h-full w-full flex items-center justify-center z-10">
        <Card className="w-[30rem] h-auto">
            <CardHeader>
                <div className="flex flex-row justify-between align-middle items-center">
                    <div>
                        <CardTitle className="leading-[1.3rem]">Are you sure you want to delete this Wallet?</CardTitle>
                    </div>
                    <button onClick={closeModal} className="cursor-pointer">
                        <X />
                    </button>
                </div>
                <CardDescription className="mt-3">This action cannot be undone</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}><Button className="w-full mt-2 cursor-pointer" type="submit" variant={'destructive'}>Delete</Button></form>
            </CardContent>
        </Card>
      </div>
    );
  }

  export default DeleteWalletModal;