import BackgroundFX from "@/components/ui/background-fx";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Chakra_Petch } from "next/font/google";
import Link from "next/link";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: "700" });

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">   
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Control your investments with intelligence and simplicity</h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Build various wallets, keep track of your assets in realtime and receive automatic insights.</p>
          <div className="flex flex-row gap-6 justify-center align-middle mt-12">
            <Button variant="default" asChild><Link href="/dashboard">Get Started</Link></Button>
            <Button variant="link"><Link href="/sign-in">Sign In</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
