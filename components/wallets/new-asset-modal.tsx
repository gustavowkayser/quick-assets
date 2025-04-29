
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Divide, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { createWallet } from "@/app/actions/actions";
import { toast } from "sonner";
import { revalidate } from "@/app/actions/routing";
import { redirect, usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

function NewAssetModal({ closeModal }: { closeModal: any }) {
    const { userId, isLoaded } = useAuth();
    const [searchItems, setSearchItems] = useState<any[]>()
    const [currentTicker, setCurrentTicker] = useState<string>('')
    const [tickerData, setTickerData] = useState<any>()

    const fetchData = async (url: string) => {
        if (!isLoaded) return;

        const data = await fetch(url)
        const result = await data.json()

        return result
    }

    const search = async (value: string) => {
        if (!isLoaded) return;

        const ticker = value

        if (value.length < 2) {
            setSearchItems([])
            return
        }
        const search = await fetchData(`https://brapi.dev/api/quote/list?search=${ticker}&token=${process.env['NEXT_PUBLIC_API_TOKEN']}`)

        setSearchItems(search.stocks)
        console.log(search)
    }

    const handleTickerChange = async (ticker: string) => {
        setCurrentTicker(ticker)

        if (ticker == '') {
            setTickerData(null)
            return
        }

        const data = await fetchData(`https://brapi.dev/api/quote/${ticker}?modules=financialData&token=${process.env['NEXT_PUBLIC_API_TOKEN']}`)

        setTickerData(data)
        console.log(data)
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
      <div className="fixed inset-0 backdrop-blur-[2px] bg-background/30 overflow-y-auto h-full w-full flex items-center justify-center z-10">
        <Card className="w-2xl h-auto">
            <CardHeader>
                <div className="flex flex-row justify-between align-middle items-center">
                    <CardTitle>Add New Asset</CardTitle>
                    <button onClick={closeModal} className="cursor-pointer">
                        <X />
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="w-full flex flex-col gap-6" autoComplete="off">
                    <div className="flex flex-row gap-7">
                        <div className="w-full max-w-96 flex flex-col gap-2">
                            <label>Ticker</label>
                            <Input placeholder="Ticker" id="ticker" name="ticker" onChange={(value) => search(value.target.value)}/>
                            <ScrollArea className="h-64 border rounded-lg">
                                <h2 className="text-center p-1">Assets</h2>
                                <Separator />
                                { !searchItems || searchItems.length == 0 ? <>{ currentTicker == '' ? <div className="p-3"><p className="text-white/50 text-center">Please insert your search in the search input. Must be at least 2 characters long.</p></div> : <div className="flex bg-white/10 p-3 justify-between">
                                <Button variant='ghost' onClick={() => handleTickerChange('')}>
                                    <Check />{currentTicker}<div/>
                                </Button></div>}</> :
                                <div>
                                    {searchItems?.map((item) => (
                                        <>
                                            <div key={item.stock} className={cn("flex flex-row gap-3 px-4 py-2", currentTicker == item.stock ? 'bg-white/10' : '')}>
                                                <li key={item.stock} className="w-full list-none">
                                                    <Button className="w-full" variant='ghost' key={item.stock} onClick={() => handleTickerChange(item.stock)}>
                                                        <div className="w-full flex flex-row align-middle items-center justify-between">
                                                            <div>
                                                                { currentTicker == item.stock ? <Check /> : <></>}
                                                            </div>
                                                            <div className="flex items-center align-middle gap-2">
                                                                { item.logo != "https://icons.brapi.dev/icons/BRAPI.svg" ? <img key={item.stock} src={item.logo} alt="" className="w-6" /> : <></>}
                                                                <p>{item.stock}</p>
                                                            </div>
                                                            <div></div>
                                                        </div>
                                                    </Button>
                                                </li>
                                            </div>
                                            <Separator />
                                        </>
                                    ))}
                                </div>
                                }
                            </ScrollArea>
                        </div>
                        <div className="w-full">
                            <h1>Current Price</h1>
                        </div>
                    </div>
                    <Button className="mt-5 cursor-pointer" type="submit">Add</Button>
                </form>
            </CardContent>
        </Card>
      </div>
    );
  }

  export default NewAssetModal;