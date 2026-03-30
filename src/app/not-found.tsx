"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
     return (
          <div className="h-screen w-full bg-black flex items-center justify-center">

               <div className="flex flex-col items-center gap-10">
                    <Image
                         src="/404.webp"
                         alt="404 not found"
                         width={500}
                         height={500}
                         className="object-contain"
                         priority
                    />
                    <Button variant="outline" className="rounded-full" onClick={() => window.location.href = "/"}>Go Home</Button>
               </div>


          </div>
     );
}