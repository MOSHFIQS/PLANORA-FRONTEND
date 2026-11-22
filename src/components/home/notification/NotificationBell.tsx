"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
     Popover,
     PopoverContent,
     PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getNotificationsAction, markAllNotificationsReadAction, markNotificationReadAction } from "@/actions/notification.action";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
     const [notifications, setNotifications] = useState<any[]>([]);
     const [open, setOpen] = useState(false);

     const unread = notifications.filter((n) => !n.isRead).length;

     const load = async () => {
          try {
               const res = await getNotificationsAction();
               if (res?.ok && Array.isArray(res?.data)) {
                    setNotifications(res.data);
               }
          } catch (err) {
               console.error("Failed to load notifications:", err);
          }
     };

     useEffect(() => { load(); }, []);

     const handleMarkRead = async (id: string) => {
          try {
               await markNotificationReadAction(id);
               setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
               );
          } catch (err) {
               console.error("Failed to mark notification read:", err);
          }
     };

     const handleMarkAll = async () => {
          try {
               await markAllNotificationsReadAction();
               setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
          } catch (err) {
               console.error("Failed to mark all notifications read:", err);
          }
     };

     const typeColors: Record<string, string> = {
          ORDER_UPDATE: "bg-indigo-50 border-indigo-300",
          PAYMENT_UPDATE: "bg-emerald-50 border-emerald-300",
          PRESCRIPTION_STATUS: "bg-indigo-50 border-indigo-300",
          PROMOTION: "bg-indigo-50 border-indigo-300",
          SYSTEM: "bg-gray-50 border-gray-200",
     };

     return (
          <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) load(); }}>
               <PopoverTrigger asChild>
                    <Button
                         variant="ghost"
                         size="icon"
                         className="relative rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                         {/* Bell Icon */}
                         <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />

                         {/* Notification Badge */}
                         {unread > 0 && (
                              <span
                                   className=" absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[4px] bg-[#4F46E5] text-white text-[10px] font-semibold rounded-md flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-900 animate-in fade-in zoom-in-50 "
                              >
                                   {unread > 9 ? "9+" : unread}
                              </span>
                         )}
                    </Button>
               </PopoverTrigger>
               <PopoverContent className="w-80 p-0" align="end">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                         <h3 className="font-semibold">Notifications</h3>
                         {unread > 0 && (
                              <button onClick={handleMarkAll} className="text-xs text-[#4F46E5] hover:underline">
                                   Mark all read
                              </button>
                         )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y">
                         {notifications.length === 0 ? (
                              <p className="text-center text-sm text-muted-foreground py-6">No notifications</p>
                         ) : (
                              notifications.map((n) => (
                                   <div
                                        key={n.id}
                                        onClick={() => !n.isRead && handleMarkRead(n.id)}
                                        className={cn(
                                             "px-4 py-3 cursor-pointer hover:bg-gray-50 border-l-2 transition-colors",
                                             n.isRead ? "border-transparent opacity-60" : typeColors[n.type] || "border-gray-200"
                                        )}
                                   >
                                        <p className="text-sm font-medium">{n.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                             {new Date(n.createdAt).toLocaleString()}
                                        </p>
                                   </div>
                              ))
                         )}
                    </div>
               </PopoverContent>
          </Popover>
     );
}