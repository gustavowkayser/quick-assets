
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { FormEvent, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { createWallet } from "@/app/actions/actions";
import { toast } from "sonner";
import { revalidate } from "@/app/actions/routing";
import { usePathname, useRouter } from "next/navigation";

function WalletModal({ closeModal }: { closeModal: any }) {
    const { userId, isLoaded } = useAuth();
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname()

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!isLoaded) return;

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')?.toString() || ''
        const passcode = formData.get('passcode')?.toString() || ''

        const wallet = await createWallet(name, passcode, userId)

        toast('A new wallet was created!')

        await revalidate(`/wallets/${wallet?.id}`)
    }

    return (
      <div className="fixed inset-0 backdrop-blur-[2px] bg-background/30 overflow-y-auto h-full w-full flex items-center justify-center z-10">
        <Card className="w-96 h-auto">
            <CardHeader>
                <div className="flex flex-row justify-between align-middle items-center">
                    <CardTitle>Create new Wallet</CardTitle>
                    <button onClick={closeModal} className="cursor-pointer">
                        <X />
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label>Name</label>
                        <Input placeholder="Name" id="name" name="name"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Passcode (Optional)</label>
                        <Input placeholder="Passcode" id="passcode" type="password" name="passcode"/>
                    </div>
                    <Button className="mt-5 cursor-pointer" type="submit">Create</Button>
                </form>
            </CardContent>
        </Card>
      </div>
    );
  }

  export default WalletModal;