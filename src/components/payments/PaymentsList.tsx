"use client";

import {
     Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/types/payment.types";
import { usePathname } from "next/navigation";
import path from "path";

export default function PaymentsList({ payments }: { payments: Payment[] }) {
     const pathname = usePathname()
     console.log(payments);
     return (
          <Card>
             {
               pathname === "/dashboard/payments" ? (
                    <CardHeader>
                         <CardTitle className="text-xl">My Payments</CardTitle>
                    </CardHeader>
               ): (
                    <CardHeader>
                         <CardTitle className="text-xl">Event Payments</CardTitle>
                    </CardHeader>
               )
             }

               <CardContent>
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Event</TableHead>
                                   <TableHead>Name</TableHead>
                                   <TableHead>Email</TableHead>
                                   <TableHead>Amount</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead>Transaction ID</TableHead>
                                   <TableHead>Date</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {payments?.length > 0 ? (
                                   payments.map((payment: any) => (
                                        <TableRow key={payment.id}>
                                             <TableCell>
                                                  {payment.participation?.event?.title || "N/A"}
                                             </TableCell>
                                             <TableCell>
                                                  {payment.user.name || "N/A"}
                                             </TableCell>
                                             <TableCell>
                                                  {payment.user.email || "N/A"}
                                             </TableCell>

                                             <TableCell>
                                                  ${payment.amount}
                                             </TableCell>

                                             <TableCell>
                                                  <Badge
                                                       className={
                                                            payment.status === "SUCCESS"
                                                                 ? "bg-green-500"
                                                                 : payment.status === "PENDING"
                                                                      ? "bg-yellow-500"
                                                                      : "bg-red-500"
                                                       }
                                                  >
                                                       {payment.status}
                                                  </Badge>
                                             </TableCell>

                                             <TableCell className="text-xs">
                                                  {payment.transactionId}
                                             </TableCell>

                                             <TableCell>
                                                  {new Date(payment.createdAt).toLocaleString()}
                                             </TableCell>
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4">
                                             No payments found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}