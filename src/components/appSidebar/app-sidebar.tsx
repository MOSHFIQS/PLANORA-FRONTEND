"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarRail,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types/routes.type";
import { NavUser } from "../ui/nav-user";

export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {
     const pathname = usePathname();
     let routes: Route[] = [];

     switch (user.role) {
          case Roles.admin:
               routes = adminRoutes;
               break;
          case Roles.user:
               routes = userRoutes;
               break;
          default:
               routes = [];
               break;
     }

     return (
          <Sidebar  {...props}>
               <SidebarContent >
                    <Link href={"/"} className="flex items-center gap-2 justify-start pt-4 pl-4">
                         <img
                              src="/logo/logo.png"
                              className="max-h-8 dark:invert"
                              alt="logo"
                         />
                         <span className="text-lg font-semibold tracking-tighter">PLANORA</span>
                    </Link>

                    {routes.map((group) => (
                         <SidebarGroup key={group.title}>
                              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                              <SidebarGroupContent >
                                   <SidebarMenu>
                                        {group.items.map((item) => {
                                             const isActive = pathname === item.url;
                                             const Icon = item.icon;

                                             return (
                                                  <SidebarMenuItem key={item.title}>
                                                       <SidebarMenuButton
                                                            asChild
                                                            className={`text-[13px] uppercase font-bold rounded px-2 py-0
        ${isActive
                                                                      ? "bg-gray-600 text-white cursor-default"
                                                                      : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black"
                                                                 }`}
                                                       >
                                                            <Link href={item.url} className="flex items-center gap-2">
                                                                 {Icon && <Icon size={18} />}
                                                                 {item.title}
                                                            </Link>
                                                       </SidebarMenuButton>
                                                  </SidebarMenuItem>
                                             );
                                        })}
                                   </SidebarMenu>
                              </SidebarGroupContent>
                         </SidebarGroup>
                    ))}
               </SidebarContent>
               <SidebarFooter>
                    <NavUser />
               </SidebarFooter>

               <SidebarRail />
          </Sidebar>
     );
}