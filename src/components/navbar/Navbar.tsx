"use client";

import { Menu } from "lucide-react";
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

  const menu = [
    { title: "Home", url: "/" },
    { title: "All Events", url: "/events" },
  ];

  const handleSearch = (value: string) => {
    setSearch(value);

    if (value.trim()) {
      router.push(`/events?search=${value}`);
    } else {
      router.push(`/events`);
    }
  };

  return (
    <section className="py-4 border-b">
      <div>
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo/logo.png" className="max-h-8" />
            <span className="text-lg font-semibold">PLANORA</span>
          </Link>

          {/* Menu */}
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

          {/* Search + Auth */}
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search Events..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-56"
            />

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
                  <Link href="/register">Register</Link>
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
                <SheetTitle className="text-center font-extrabold">
                  PLANORA
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                {menu.map((item) => (
                  <Link key={item.title} href={item.url}>
                    {item.title}
                  </Link>
                ))}

                <Input
                  placeholder="Search Events..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
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