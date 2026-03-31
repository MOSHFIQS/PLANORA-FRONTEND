"use client";

import {
     Table,
     TableHeader,
     TableRow,
     TableHead,
     TableBody,
     TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/types/payment.types";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

export default function PaymentsList({ payments }: { payments: Payment[] }) {
     const pathname = usePathname();

     const downloadTextFile = (filename: string, content: string) => {
          const blob = new Blob([content], { type: "text/plain" });
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();

          window.URL.revokeObjectURL(url);
     };

     return (
          <Card>
               {pathname === "/dashboard/payments" ? (
                    <CardHeader>
                         <CardTitle className="text-xl">My Payments</CardTitle>
                    </CardHeader>
               ) : (
                    <CardHeader>
                         <CardTitle className="text-xl">Event Payments</CardTitle>
                    </CardHeader>
               )}

               <CardContent>
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Event</TableHead>
                                   <TableHead>Name</TableHead>
                                   <TableHead>Email</TableHead>
                                   <TableHead>Amount</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead className="text-center">Transaction ID</TableHead>
                                   <TableHead className="text-center">Invoice</TableHead>
                                   <TableHead className="text-center">Date</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody className="text-gray-800">
                              {payments?.length > 0 ? (
                                   payments.map((payment: any) => (
                                        <TableRow key={payment.id}>
                                             {/* Event */}
                                             <TableCell className="py-5">
                                                  {payment.participation?.event?.title || "N/A"}
                                             </TableCell>

                                             {/* Name */}
                                             <TableCell className="py-5">
                                                  {payment?.user?.name || "N/A"}
                                             </TableCell>

                                             {/* Email */}
                                             <TableCell className="py-5">
                                                  {payment?.user?.email || "N/A"}
                                             </TableCell>

                                             {/* Amount */}
                                             <TableCell className="py-5">
                                                  {payment?.amount} tk
                                             </TableCell>

                                             {/* Status */}
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

                                             {/* Transaction ID + Download */}
                                             <TableCell className="text-center">
                                                  {/* <span>{payment?.transactionId}</span> */}

                                                  <button
                                                       onClick={() =>
                                                            downloadTextFile(
                                                                 `transaction-${payment.id}.txt`,
                                                                 payment?.transactionId
                                                            )
                                                       }
                                                       className="p-2 rounded-md border bg-white hover:bg-gray-100 hover:shadow-sm transition"
                                                  >
                                                       <Download size={16} />
                                                  </button>
                                             </TableCell>

                                             {/* Invoice */}
                                             <TableCell className="py-5 text-xs flex items-center gap-2 justify-center w-full">
                                                  {payment?.invoiceUrl ? (
                                                       <div className="flex items-center gap-2">
                                                            <a
                                                                 href={payment.invoiceUrl}
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 className="p-2 rounded-md border hover:bg-gray-100 transition"
                                                            >
                                                                 View
                                                            </a>

                                                            <a
                                                                 href={payment.invoiceUrl}
                                                                 download
                                                                 className="p-2 rounded-md border hover:bg-gray-100 transition"
                                                            >
                                                                 <Download size={16} />
                                                            </a>
                                                       </div>
                                                  ) : (
                                                       "N/A"
                                                  )}
                                             </TableCell>

                                             {/* Date */}
                                             <TableCell className="py-5 text-center">
                                                  {new Date(payment?.createdAt).toLocaleString()}
                                             </TableCell>
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={8} className="text-center py-5">
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