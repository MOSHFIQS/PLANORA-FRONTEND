"use client";

import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QRCodeCanvas } from "qrcode.react";
import DescriptionViwer from "../../shared/descriptionViwer/DescriptionViwer";
import { usePayment } from "@/hooks/usePayment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Download } from "lucide-react";
import ImageMagnifier from "@/components/shared/imageUtils/imageMagnifier/ImageMagnifier";

type Props = {
  type: "FULL" | "PUBLIC";
  data: any;
};

const EventDetailsSmart = ({ type, data }: Props) => {
  const { handlePayment, loadingId } = usePayment();

  const isFull = type === "FULL";

  const event = isFull ? data?.event : data;
  const ticket = isFull ? data?.ticket : null;
  const payment = isFull ? data?.payment : [];
  const user = isFull ? data?.user : null;
  const status = isFull ? data?.status : null;

  // console.log(payment);

  const date = event?.dateTime ? new Date(event.dateTime) : null;
  const isFree = event?.fee === 0;

  return (
    <div className="space-y-6 ">
      <Card className=" border">
        {/* HEADER */}
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 px-6 py-5 border-b border-gray-200">
          {/* Left: Event Title */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {event?.title}
            </h1>
            {event?.subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {event.subtitle}
              </p>
            )}
          </div>

          {/* Right: Organizer & Participant */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Organizer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold">
                {event?.organizer?.name?.[0] || "O"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-400 tracking-wider">Organizer</span>
                <span className="font-medium text-gray-900">{event?.organizer?.name}</span>
              </div>
            </div>

            {/* Participant (FULL only) */}
            {isFull && user && (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                <div className="w-10 h-10 bg-purple-200 text-purple-800 rounded-full flex items-center justify-center font-semibold">
                  {user?.name?.[0] || "P"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase text-purple-600 tracking-wide">Participant</span>
                  <span className="font-semibold text-gray-900">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        {/* IMAGES */}
        {event?.images?.length > 0 && (
          <div className="px-4">
            <ImageMagnifier images={[...event.images].filter(Boolean)} />
          </div>
        )}

        <div className="px-4 space-y-4 pt-5">
          {/* MAIN INFO */}
          <Card className="flex flex-col md:flex-row md:text-start text-center justify-between items-center gap-4 px-4 bg-[#F3F2EC]">
            <div className="space-y-3">
              {date && (
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {format(date, "PPP")}
                </p>
              )}
              {date && (
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {format(date, "p")}
                </p>
              )}
              {event?.venue && (
                <p>
                  <span className="font-semibold">Venue:</span>{" "}
                  {event.venue}
                </p>
              )}

              <p>
                <span className="font-semibold">Type:</span>{" "}
                <Badge variant="outline">{event?.type}</Badge>
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold">Fee : </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {event.fee} tk
                </span>
              </p>

              {/* ONLY FULL */}
              {isFull && (
                <p>
                  <span className="font-semibold">
                    Participation Status:
                  </span>{" "}
                  {status}
                </p>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center gap-4">
              {/* FULL → QR */}
              {isFull && ticket?.qrCode && (
                <Card className="p-4">
                  <QRCodeCanvas value={ticket.qrCode} size={180} />
                  <p className="text-center ">
                    <span className="font-semibold ">Ticket:</span>{" "}
                    {ticket.status}
                  </p>
                </Card>
              )}


            </div>
          </Card>

          {/* PAYMENT (ONLY FULL) */}
          {isFull && payment?.length > 0 && (
            <div className="space-y-4">
              <p className="font-semibold text-md">Payment Details:</p>

              <div className="overflow-x-auto bg-[#f3f2ec] rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Transaction ID</TableHead>
                      <TableHead className="text-center">Invoice</TableHead>
                      <TableHead className="text-center">Paid At</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="text-gray-800">
                    {payment.map((p: any) => (
                      <TableRow key={p.id}>
                        {/* Amount */}
                        <TableCell className="text-center">{p.amount} tk</TableCell>

                        {/* Status */}
                        <TableCell className="text-center">
                          <Badge
                            className={
                              p.status === "SUCCESS"
                                ? "bg-green-400"
                                : p.status === "PENDING"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                            }
                          >
                            {p.status}
                          </Badge>
                        </TableCell>

                        {/* Transaction ID Download */}
                        <TableCell className="text-center">
                          {p.transactionId ? (
                            <button

                              onClick={() => {
                                const blob = new Blob([p.transactionId], { type: "text/plain" });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `transaction-${p.id}.txt`;
                                a.click();
                                window.URL.revokeObjectURL(url);
                              }}
                              className="p-2 rounded-md border bg-white hover:bg-gray-100 hover:shadow-sm transition"
                            >
                              <Download size={16} />
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>

                        {/* Invoice */}
                        <TableCell className="text-center">
                          {p.invoiceUrl ? (
                            <div className="flex items-center justify-center gap-2">
                              <a
                                href={p.invoiceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-md border  bg-white transition"
                              >
                                View
                              </a>
                              <a
                                href={p.invoiceUrl}
                                download
                                target="_blank"
                                className="p-2 rounded-md border  bg-white transition"
                              >
                                <Download size={16} />
                              </a>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>

                        {/* Paid At */}
                        <TableCell className="text-center">
                          {p.createdAt ? new Date(p.createdAt).toLocaleString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* MEETING LINK (ONLY FULL) */}
          {isFull && event?.type === "ONLINE" && event?.meetingLink && (
            <div className="space-y-2">
              <p className="font-semibold">Meeting Link:</p>
              <Card className="p-4">
                <a
                  href={event.meetingLink}
                  target="_blank"
                  className="text-blue-600 underline break-all"
                >
                  {event.meetingLink}
                </a>
              </Card>
            </div>
          )}

          {/* DESCRIPTION */}
          {event?.description && (
            <div>
              <p className="font-semibold mb-2">Description:</p>
              <DescriptionViwer
                description={event.description}
                height="30px"
              />
            </div>
          )}
        </div>

        {!isFull && (
          <CardFooter className="px-4">
            <Button variant={"violet"}
              className={`w-full rounded-full`}
              disabled={loadingId === event?.id || !event?.id}
              onClick={() => {
                if (!event?.id) {
                  console.error("Missing event id", event);
                  return;
                }

                handlePayment({
                  eventId: event.id,
                });
              }}
            >
              {loadingId === event?.id
                ? "Processing..."
                : isFree
                  ? "Join Free"
                  : `Pay ${event?.fee} tk to join event`}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default EventDetailsSmart;