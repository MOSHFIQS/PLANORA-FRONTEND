"use client";

import { format } from "date-fns";
import { MyJoinedEvent } from "@/types/joinedEvent.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppImage } from "../appImage/AppImage";
import { QRCodeCanvas } from "qrcode.react";
import ImageMagnifier from "../imageMagnifier/ImageMagnifier";
import DescriptionViwer from "../descriptionViwer/DescriptionViwer";

type Props = {
  joinedEventData: MyJoinedEvent;
};

const MyJoinedEventDetails = ({ joinedEventData }: Props) => {
  const { event, ticket, payment, status, user } = joinedEventData;
  console.log(event);
  console.log(ticket);
  console.log(payment);
  console.log(status);
  console.log(user);
  const date = event?.dateTime ? new Date(event.dateTime) : null;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl">{event?.title}</CardTitle>
          <CardDescription>
            Organized by: <strong>{event?.organizer?.name}</strong>
          </CardDescription>
          <CardDescription>
            Participant: <strong>{user?.name} ({user?.email})</strong>
          </CardDescription>
        </CardHeader>


        {event?.images && event.images.length > 0 && (
          <div className="px-4">
            <ImageMagnifier
              images={[...event.images].filter(Boolean)}
            />
          </div>
        )}

        <CardContent className="space-y-4">
          {/* Event Details */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-4">
              {date && (
                <p>
                  <span className="font-semibold">Date:</span> {format(date, "PPP")}
                </p>
              )}
              {date && (
                <p>
                  <span className="font-semibold">Time:</span> {format(date, "p")}
                </p>
              )}
              {event?.venue && (
                <p>
                  <span className="font-semibold">Venue:</span> {event.venue}
                </p>
              )}
              <p>
                <span className="font-semibold">Type:</span> {event?.type}
              </p>
              <p>
                <span className="font-semibold">Fee:</span> {event?.fee} tk{" "}
                {event?.fee === 0 && <span className="text-green-600 font-medium">(Free)</span>}
              </p>

              {/* Participation Status */}
              <p>
                <span className="font-semibold">Participation Status:</span> {status}
              </p>
            </div>
            {/* Ticket Info */}
            {ticket && (
              <div className="space-y-2">
                <div className="border p-4 rounded flex flex-col ">

                  {ticket.qrCode && (
                    <div className="mt-4 sm:mt-0">
                      <QRCodeCanvas value={ticket.qrCode} size={200} />
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-center pt-3">Status: {ticket.status}</p>
                    {/* <p>Created at: {format(new Date(ticket.createdAt), "PPP p")}</p> */}
                    {ticket.checkedInAt && (
                      <p>Checked In At: {format(new Date(ticket.checkedInAt), "PPP p")}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Info */}
          {payment && payment.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold">Payment:</p>
              {payment.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row justify-between border p-2 rounded"
                >
                  <span>Status: {p.status}</span>
                  <span>Amount: {p.amount} tk</span>
                  {p.invoiceUrl && (
                    <a
                      href={p.invoiceUrl}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Invoice
                    </a>
                  )}
                  <span>
                    Paid at: {format(new Date(p.createdAt), "PPP p")}
                  </span>
                  {p.transactionId && <span>Transaction ID: {p.transactionId}</span>}
                </div>
              ))}
            </div>
          )}



          {event?.type === "ONLINE" && event?.meetingLink && (
            <div>
              <p className="font-semibold">Meeting Link:</p>
              <a
                href={event.meetingLink}
                target="_blank"
                className="text-blue-600 underline break-all"
              >
                {event.meetingLink}
              </a>
            </div>
          )}

          {event?.description && (
            <div>
              <p className="font-semibold mb-2">Description:</p>
              <div>
                <DescriptionViwer
                  description={event.description}
                  height="300px"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyJoinedEventDetails;