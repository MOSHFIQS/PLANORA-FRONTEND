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
import { agentRoutes } from "@/routes/agentRoutes";
import { Route } from "@/types/routes.type";
import { NavUser } from "../ui/nav-user";

export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {
     const pathname = usePathname();
     let routes: Route[] = [];

     switch (user.role) {
          case Roles.admin:
               routes = adminRoutes;
               break;
          case Roles.agent:
               routes = agentRoutes;
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
                              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                              className="max-h-8 dark:invert"
                              alt="logo"
                         />
                         <span className="text-lg font-semibold tracking-tighter">Afrans Perfume</span>
                    </Link>

                    {routes.map((group) => (
                         <SidebarGroup key={group.title}>
                              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                              <SidebarGroupContent >
                                   <SidebarMenu>
                                        {group.items.map((item) => {
                                             const isActive = pathname === item.url;

                                             return (
                                                  <SidebarMenuItem key={item.title}>
                                                       <SidebarMenuButton
                                                            asChild
                                                            className={`text-[15px] font-semibold rounded px-2 py-1
               ${isActive
                                                                      ? "bg-gray-600 text-white cursor-default"
                                                                      : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black"
                                                                 }`}
                                                       >
                                                            <Link href={item.url}>{item.title}</Link>
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
                    <NavUser/>
               </SidebarFooter>
               
               <SidebarRail />
          </Sidebar>
     );
}