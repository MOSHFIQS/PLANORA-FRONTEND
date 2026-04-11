"use client";

import {
     Table, TableBody, TableCell,
     TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
     Shield, User, ShoppingCart, CreditCard,
     Package, Tag, FileText, Clock
} from "lucide-react";

interface AuditLog {
     id: string;
     action: string;
     entityType: string;
     entityId: string;
     metadata?: any;
     ipAddress?: string | null;
     userAgent?: string | null;
     description?: string;
     createdAt: string;
     actor?: { id: string; name: string; email: string; role: string } | null;
     actorId?: string;
}

const ACTION_VARIANT: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
     ORDER_CREATED: "default",
     ORDER_CANCELLED: "destructive",
     PAYMENT_REFUNDED: "destructive",
     USER_BANNED: "destructive",
     USER_SUSPENDED: "secondary",
     USER_ACTIVE: "default",
};

const ENTITY_ICONS: Record<string, React.ReactNode> = {
     Order: <ShoppingCart className="w-3.5 h-3.5" />,
     Payment: <CreditCard className="w-3.5 h-3.5" />,
     User: <User className="w-3.5 h-3.5" />,
     Medicine: <Package className="w-3.5 h-3.5" />,
     Coupon: <Tag className="w-3.5 h-3.5" />,
};

export default function AuditLogs({ logs }: { logs: AuditLog[] }) {
     return (
          <div className="px-4 py-6 space-y-6">

               {/* Header */}
               <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                         <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                         <h1 className="text-2xl font-bold">Audit Logs</h1>
                         <p className="text-sm text-muted-foreground">
                              {logs.length} total event{logs.length !== 1 ? "s" : ""} recorded
                         </p>
                    </div>
               </div>

               {/* Table */}
               <Card>
                    <CardContent>
                         <Table>
                              <TableHeader>
                                   <TableRow>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Entity Type</TableHead>
                                        <TableHead>Entity ID</TableHead>
                                        <TableHead>Performed By</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>IP Address</TableHead>
                                        <TableHead>Metadata</TableHead>
                                        <TableHead>Time</TableHead>
                                   </TableRow>
                              </TableHeader>

                              <TableBody>
                                   {logs.length === 0 ? (
                                        <TableRow>
                                             <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                                  No audit logs found.
                                             </TableCell>
                                        </TableRow>
                                   ) : (
                                        logs.map((log) => (
                                             <TableRow key={log.id}>

                                                  {/* Action */}
                                                  <TableCell>
                                                       <Badge variant={ACTION_VARIANT[log.action] ?? "outline"}>
                                                            {log.action.replace(/_/g, " ")}
                                                       </Badge>
                                                  </TableCell>

                                                  {/* Entity Type */}
                                                  <TableCell>
                                                       <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                            {ENTITY_ICONS[log.entityType] ?? <FileText className="w-3.5 h-3.5" />}
                                                            {log.entityType}
                                                       </span>
                                                  </TableCell>

                                                  {/* Entity ID */}
                                                  <TableCell>
                                                       <span className="font-mono text-xs text-muted-foreground">
                                                            #{log.entityId.slice(0, 8).toUpperCase()}
                                                       </span>
                                                  </TableCell>

                                                  {/* Performed by */}
                                                  <TableCell>
                                                       {log.actor ? (
                                                            <div className="flex items-center gap-2">
                                                                 <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                      {log.actor.name?.charAt(0).toUpperCase()}
                                                                 </div>
                                                                 <div>
                                                                      <p className="text-sm font-medium leading-none">{log.actor.name} <span className="text-xs text-muted-foreground">({log.actor.role})</span></p>
                                                                      <p className="text-xs text-muted-foreground">{log.actor.email}</p>
                                                                 </div>
                                                            </div>
                                                       ) : (
                                                            <span className="text-xs text-muted-foreground">System</span>
                                                       )}
                                                  </TableCell>

                                                  {/* Description */}
                                                  <TableCell>
                                                       <span className="text-xs text-muted-foreground">
                                                            {log.description ?? "—"}
                                                       </span>
                                                  </TableCell>

                                                  {/* IP */}
                                                  <TableCell>
                                                       <span className="font-mono text-xs text-muted-foreground">
                                                            {log.ipAddress ?? "—"}
                                                       </span>
                                                  </TableCell>

                                                  {/* Metadata (replaces old Before/After) */}
                                                  <TableCell className="max-w-[150px]">
                                                       {log.metadata ? (
                                                            <pre className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 rounded-md px-2 py-1 truncate overflow-hidden">
                                                                 {JSON.stringify(log.metadata)}
                                                            </pre>
                                                       ) : (
                                                            <span className="text-xs text-muted-foreground">—</span>
                                                       )}
                                                  </TableCell>

                                                  {/* Time */}
                                                  <TableCell>
                                                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                                            <div>
                                                                 <p>
                                                                      {new Date(log.createdAt).toLocaleDateString("en-GB", {
                                                                           day: "2-digit", month: "short", year: "numeric",
                                                                      })}
                                                                 </p>
                                                                 <p className="text-[10px]">
                                                                      {new Date(log.createdAt).toLocaleTimeString("en-GB", {
                                                                           hour: "2-digit", minute: "2-digit", second: "2-digit",
                                                                      })}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </TableCell>

                                             </TableRow>
                                        ))
                                   )}
                              </TableBody>
                         </Table>
                    </CardContent>
               </Card>

          </div>
     );
}