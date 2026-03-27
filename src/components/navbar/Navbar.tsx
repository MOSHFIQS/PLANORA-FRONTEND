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
import { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";

interface MenuItem {
     title: string;
     url: string;
}

const Navbar = () => {
     const { user, logout, loading } = useAuth();
     const router = useRouter();
     const pathname = usePathname();
     const [search, setSearch] = useState("");




     const handleLogout = () => {
          logout();
          router.push("/");
     };

     if (loading) {
          return (
               <section className="py-4">
                    <div className="h-10" />
               </section>
          );
     }

     const menu: MenuItem[] = [
          { title: "Home", url: "/" },
          { title: "All Events", url: "/event" },
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

                         {/* Search + Auth */}
                         <div className="flex items-center gap-3">

                              {/* Search */}
                              <div className="flex items-center gap-2">
                                   <Input
                                        placeholder="Search products..."
                                        value={search}
                                        onChange={(e) => {
                                             const value = e.target.value;
                                             setSearch(value);

                                             if (value.trim()) {
                                                  // If there is a search term
                                                  router.push(`/events?search=${value}`);
                                             } else {
                                                  // If the field is empty, show all events
                                                  router.push(`/events`);
                                             }
                                        }}
                                        className="w-56"
                                   />


                              </div>

                              {/* Auth */}
                              {user?.id ? (
                                   <Button variant="outline" onClick={handleLogout}>
                                        Logout
                                   </Button>
                              ) : (
                                   <>
                                        <Button asChild variant="outline">
                                             <Link href={`/login?redirect=${pathname}`}>
                                                  Login
                                             </Link>
                                        </Button>

                                        <Button asChild>
                                             <Link href="/register">
                                                  Register
                                             </Link>
                                        </Button>
                                   </>
                              )}
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

                                   <div className="flex flex-col gap-4 mt-4">
                                        {menu.map((item) => (
                                             <Link
                                                  key={item.title}
                                                  href={item.url}
                                                  className="font-semibold"
                                             >
                                                  {item.title}
                                             </Link>
                                        ))}

                                        <Input
                                             placeholder="Search Events..."
                                             value={search}
                                             onChange={(e) => {
                                                  const value = e.target.value;
                                                  setSearch(value);

                                                  if (value.trim()) {
                                                       // If there is a search term
                                                       router.push(`/events?search=${value}`);
                                                  } else {
                                                       // If the field is empty, show all products
                                                       router.push(`/events`);
                                                  }
                                             }}
                                             className="w-56"
                                        />


                                   </div>
                              </SheetContent>
                         </Sheet>
                    </div>
               </div>
          </section>
     );
};

export { Navbar };