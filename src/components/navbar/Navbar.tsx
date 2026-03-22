"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
     NavigationMenu,
     NavigationMenuItem,
     NavigationMenuLink,
     NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
     Sheet,
     SheetContent,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface MenuItem {
     title: string;
     url: string;
}

const Navbar = () => {
     const router = useRouter();
     const pathname = usePathname();




     const menu: MenuItem[] = [
          { title: "Home", url: "/" },
          { title: "All Products", url: "/products" },
     ];

     return (
          <section className="py-4 border-b">
               <div >
                    <nav className="hidden items-center justify-between lg:flex">

                         {/* Logo */}
                         <Link href="/" className="flex items-center gap-2">
                              <img src="/logo/logo.png" className="max-h-8" />
                              <span className="text-lg font-semibold">
                                   PLANORA
                              </span>
                         </Link>
                         <div className="flex items-center gap-6">

                              <NavigationMenu>
                                   <NavigationMenuList>
                                        {menu.map((item) => (
                                             <NavigationMenuItem key={item.title}>
                                                  <NavigationMenuLink asChild>
                                                       <Link
                                                            href={item.url}
                                                            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md bg-gray-50 shadow"
                                                       >
                                                            {item.title}
                                                       </Link>
                                                  </NavigationMenuLink>
                                             </NavigationMenuItem>
                                        ))}
                                   </NavigationMenuList>
                              </NavigationMenu>
                         </div>

                     
                    </nav>

                    {/* Mobile */}
                    <div className="flex items-center justify-between lg:hidden">

                         <Link href="/">
                              <img src="/logo/logo.png" className="max-h-8" />
                         </Link>

                         <Sheet>
                              <SheetTrigger asChild>
                                   <Button variant="outline" size="icon">
                                        <Menu className="w-4 h-4" />
                                   </Button>
                              </SheetTrigger>

                              <SheetContent>
                                   <SheetHeader>
                                        <SheetTitle className="text-center  font-extrabold">PLANORA</SheetTitle>
                                   </SheetHeader>

                                   <div className="flex flex-col gap-4 mt-4 px-4">
                                        {menu.map((item) => (
                                             <Link
                                                  key={item.title}
                                                  href={item.url}
                                                  className="font-semibold bg-gray-100 rounded-xl text-center p-2"
                                             >
                                                  {item.title}
                                             </Link>
                                        ))}
                                   </div>
                              </SheetContent>
                         </Sheet>
                    </div>
               </div>
          </section>
     );
};

export { Navbar };