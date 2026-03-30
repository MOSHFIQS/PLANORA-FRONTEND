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

export function AppSidebar({
     user,
     ...props
}: {
     user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
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
          <Sidebar {...props} >
               <SidebarContent className="bg-[#eef0ff] rounded-lg flex flex-col justify-between px-2 py-3 overflow-y-auto 
  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* TOP */}
                    <div className="space-y-6">

                         {/* LOGO */}
                         <Link href={"/"} className="flex items-center gap-2 px-3">
                              <img
                                   src="/logo/logo.png"
                                   className="max-h-8 dark:invert"
                                   alt="logo"
                              />
                              <span className="text-lg font-semibold tracking-tight">
                                   PLANORA
                              </span>
                         </Link>

                         {/* GROUPS */}
                         <div className="space-y-2">
                              {routes.map((group) => (
                                   <SidebarGroup key={group.title}>

                                        {/* GROUP TITLE */}
                                        <SidebarGroupLabel className="px-3 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                             {group.title}
                                        </SidebarGroupLabel>

                                        <SidebarGroupContent>
                                             <SidebarMenu >

                                                  {group.items.map((item) => {
                                                       const isActive = pathname === item.url;
                                                       const Icon = item.icon;

                                                       return (
                                                            <SidebarMenuItem key={item.title}>
                                                                 <SidebarMenuButton
                                                                      asChild
                                                                      className={`w-full px-3 py-2 font-bold rounded-md flex items-center gap-2 text-[13px] transition-all duration-200
                                                                      ${
                                                                           isActive
                                                                                ? "bg-gray-500 text-white shadow-sm rounded-full"
                                                                                : "text-gray-700 hover:bg-white/60 hover:text-black"
                                                                      }`}
                                                                 >
                                                                      <Link href={item.url} className="flex items-center gap-2 w-full">
                                                                           {Icon && <Icon size={18} />}
                                                                           <span className="truncate">
                                                                                {item.title}
                                                                           </span>
                                                                      </Link>
                                                                 </SidebarMenuButton>
                                                            </SidebarMenuItem>
                                                       );
                                                  })}

                                             </SidebarMenu>
                                        </SidebarGroupContent>
                                   </SidebarGroup>
                              ))}
                         </div>
                    </div>

                    {/* FOOTER */}

               </SidebarContent>
                    <SidebarFooter className="pt-4 border-t bg-[#eef0ff]">
                         <NavUser />
                    </SidebarFooter>

               <SidebarRail />
          </Sidebar>
     );
}