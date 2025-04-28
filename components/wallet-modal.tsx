
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { FormEvent } from "react";

function WalletModal({ closeModal }: { closeModal: any }) {

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        
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