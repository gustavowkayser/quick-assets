import { cn } from "@/lib/utils";

import { Chakra_Petch } from "next/font/google";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: "700" });

export default function Home() {
  return (
    <>
      <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className={cn(chakra.className, 'flex flex-row text-7xl')}>
        <p className="relative z-20 bg-[#92DA16] bg-clip-text py-8 text-8xl font-bold text-transparent sm:text-7xl">Quick</p>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-300 bg-clip-text py-8 text-8xl font-bold text-transparent sm:text-7xl">
         Assets
        </p>
      </div>
      <p>The best way to keep track of your assets</p>
    </div>
    </>
  );
}
