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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { verifyPaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";

export default function PaymentsList({ payments }: { payments: Payment[] }) {
     const pathname = usePathname();
     const router = useRouter();
     const searchParams = useSearchParams();
     const [verifyingId, setVerifyingId] = useState<string | null>(null);

     // Auto-verify if returning from Stripe Checkout with session_id
     useEffect(() => {
          const sessionId = searchParams.get("session_id");
          const paymentId = searchParams.get("payment_id");

          if (sessionId || paymentId) {
               const verifySession = async () => {
                    const res = await verifyPaymentAction(paymentId || undefined, sessionId || undefined);
                    if (res?.ok && res?.data?.status === "SUCCESS") {
                         toast.success("Payment confirmed successfully! Ticket issued.");
                         router.replace(pathname);
                         router.refresh();
                    }
               };
               verifySession();
          }
     }, [searchParams]);

     const handleManualVerify = async (paymentId: string) => {
          setVerifyingId(paymentId);
          const toastId = toast.loading("Checking Stripe status...");

          try {
               const res = await verifyPaymentAction(paymentId);
               if (res?.ok && res?.data?.status === "SUCCESS") {
                    toast.success("Payment verified! Status updated to SUCCESS.", { id: toastId });
                    router.refresh();
               } else {
                    toast.info("Payment is still pending on Stripe or processing. Please wait a moment.", { id: toastId });
               }
          } catch (err: any) {
               toast.error(err?.message || "Sync failed", { id: toastId });
          } finally {
               setVerifyingId(null);
          }
     };

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
               <CardHeader>
                    <CardTitle className="text-xl">Payments</CardTitle>
               </CardHeader>

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
                                   payments.map((payment: any) => {
                                        const isPending = payment.status === "PENDING";
                                        const isSuccess = payment.status === "SUCCESS";

                                        return (
                                             <TableRow key={payment.id}>
                                                  {/* Event */}
                                                  <TableCell className="py-5 font-medium">
                                                       {payment.participation?.event?.title || payment.invitation?.event?.title || "Event Pass"}
                                                  </TableCell>

                                                  {/* Name */}
                                                  <TableCell className="py-5">
                                                       {payment?.user?.name || "N/A"}
                                                  </TableCell>

                                                  {/* Email */}
                                                  <TableCell className="py-5 text-slate-500">
                                                       {payment?.user?.email || "N/A"}
                                                  </TableCell>

                                                  {/* Amount */}
                                                  <TableCell className="py-5 font-bold">
                                                       ৳{payment?.amount}
                                                  </TableCell>

                                                  {/* Status */}
                                                  <TableCell className="py-5">
                                                       <div className="flex items-center gap-2">
                                                            <Badge
                                                                 className={
                                                                      isSuccess
                                                                           ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                                                           : isPending
                                                                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                                                                : "bg-rose-100 text-rose-800 border-rose-200"
                                                                 }
                                                            >
                                                                 {payment?.status}
                                                            </Badge>

                                                            {isPending && (
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => handleManualVerify(payment.id)}
                                                                      disabled={verifyingId === payment.id}
                                                                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 px-2 py-0.5 rounded border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/60 transition disabled:opacity-50"
                                                                      title="Sync payment status with Stripe"
                                                                 >
                                                                      <RefreshCw size={10} className={verifyingId === payment.id ? "animate-spin" : ""} />
                                                                      <span>Sync</span>
                                                                 </button>
                                                            )}
                                                       </div>
                                                  </TableCell>

                                                  {/* Transaction ID + Download */}
                                                  <TableCell className="text-center">
                                                       <button
                                                            onClick={() =>
                                                                 downloadTextFile(
                                                                      `transaction-${payment.id}.txt`,
                                                                      payment?.transactionId
                                                                 )
                                                            }
                                                            className="p-2 rounded-md border bg-white hover:bg-gray-100 hover:shadow-sm transition"
                                                            title="Download Transaction ID"
                                                       >
                                                            <Download size={16} />
                                                       </button>
                                                  </TableCell>

                                                  {/* Invoice */}
                                                  <TableCell className="py-5 text-xs text-center">
                                                       {payment?.invoiceUrl ? (
                                                            <div className="flex items-center gap-2 justify-center">
                                                                 <a
                                                                      href={payment.invoiceUrl}
                                                                      target="_blank"
                                                                      rel="noopener noreferrer"
                                                                      className="px-2.5 py-1 rounded-md border bg-white hover:bg-gray-100 transition font-medium"
                                                                 >
                                                                      View
                                                                 </a>

                                                                 <a
                                                                      href={payment.invoiceUrl}
                                                                      download
                                                                      target="_blank"
                                                                      className="p-1.5 rounded-md border bg-white hover:bg-gray-100 transition"
                                                                      title="Download Invoice PDF"
                                                                 >
                                                                      <Download size={14} />
                                                                 </a>
                                                            </div>
                                                       ) : (
                                                            <span className="text-slate-400">N/A</span>
                                                       )}
                                                  </TableCell>

                                                  {/* Date */}
                                                  <TableCell className="py-5 text-slate-500 text-center text-xs">
                                                       {payment?.createdAt ? new Date(payment.createdAt).toLocaleString() : "N/A"}
                                                  </TableCell>
                                             </TableRow>
                                        );
                                   })
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={8} className="text-center py-10 text-slate-400">
                                             No payment records found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}
