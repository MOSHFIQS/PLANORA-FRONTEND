"use client";

import { format } from "date-fns";
import { MyJoinedEvent } from "@/types/joinedEvent.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppImage } from "../appImage/AppImage";
import { QRCodeCanvas } from "qrcode.react";
import ImageMagnifier from "../imageMagnifier/ImageMagnifier";
import DescriptionViwer from "../descriptionViwer/DescriptionViwer";
import { Badge } from "../ui/badge";

type Props = {
  joinedEventData: MyJoinedEvent;
};

const MyParticipatedEventDetails = ({ joinedEventData }: Props) => {
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

        <div className="px-4 space-y-4 pt-5">
          {/* Event Details */}
          <Card className="flex flex-col md:flex-row md:text-start text-center justify-between items-center gap-6 px-4">
            <div className="space-y-3">
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
                <span className="font-semibold">Type:</span>{" "}
                <Badge variant="outline">{event?.type}</Badge>
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
                <Card className="p-4 rounded flex flex-col ">

                  {ticket.qrCode && (
                    <div className="mt-4 sm:mt-0">
                      <QRCodeCanvas value={ticket.qrCode} size={200} />
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-center ">
                      <span className="font-semibold">Ticket:</span>{" "}
                      {ticket.status}
                    </p>
                    {ticket.checkedInAt && (
                      <p>Checked In At: {format(new Date(ticket.checkedInAt), "PPP p")}</p>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </Card>

          {/* Payment Info */}
          {payment && payment.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold">Payment:</p>
              {payment.map((p: any) => (
                <Card
                  key={p.id}
                  className="grid grid-cols-1 xl:grid-cols-2 items-center  p-4"
                >

                  <p>
                    <span className="font-semibold">Status: </span>{" "}
                    {p.status}
                  </p>

                  <p>
                    <span className="font-semibold">Amount: </span> {" "}
                    {p.amount} tk
                  </p>

                  <p>
                    <span className="font-semibold">Paid at:</span>{" "}
                    {format(new Date(p.createdAt), "PPP p")}
                  </p>

                  {p.transactionId && <p>
                    <span className="font-semibold">TransactionId:</span>{" "}
                    {p.transactionId}
                  </p>}

                </Card>
              ))}
            </div>
          )}



          {event?.type === "ONLINE" && event?.meetingLink && (
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

          {event?.description && (
            <div>
              <p className="font-semibold mb-2">Description:</p>
              <div>
                <DescriptionViwer
                  description={event.description}
                  height="30px"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyParticipatedEventDetails;