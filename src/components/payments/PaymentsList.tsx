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
                    ) : (
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

                         <TableBody className="text-gray-800">
                              {payments?.length > 0 ? (
                                   payments.map((payment: any) => (
                                        <TableRow key={payment.id}>
                                             <TableCell className="py-5">
                                                  {payment.participation?.event?.title || "N/A"}
                                             </TableCell>

                                             <TableCell className="py-5">
                                                  {payment?.user?.name || "N/A"}
                                             </TableCell>

                                             <TableCell className="py-5">
                                                  {payment?.user?.email || "N/A"}
                                             </TableCell>

                                             <TableCell className="py-5">
                                                  {payment?.amount} tk
                                             </TableCell>

                                             <TableCell className="py-5">
                                                  <Badge
                                                       className={
                                                            payment?.status === "SUCCESS"
                                                                 ? "bg-green-500"
                                                                 : payment.status === "PENDING"
                                                                      ? "bg-yellow-500"
                                                                      : "bg-red-500"
                                                       }
                                                  >
                                                       {payment?.status}
                                                  </Badge>
                                             </TableCell>

                                             <TableCell className="py-5 text-xs">
                                                  {payment?.transactionId}
                                             </TableCell>

                                             <TableCell className="py-5">
                                                  {new Date(payment?.createdAt).toLocaleString()}
                                             </TableCell>
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={7} className="text-center py-5">
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