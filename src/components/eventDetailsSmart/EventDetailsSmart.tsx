"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QRCodeCanvas } from "qrcode.react";
import ImageMagnifier from "../imageMagnifier/ImageMagnifier";
import DescriptionViwer from "../descriptionViwer/DescriptionViwer";
import { usePayment } from "@/hooks/usePayment";

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

  const date = event?.dateTime ? new Date(event.dateTime) : null;
  const isFree = event?.fee === 0;

  return (
    <div className="space-y-6 ">
      <Card className="shadow-lg border">
        {/* HEADER */}
        <CardHeader>
          <CardTitle className="text-2xl">{event?.title}</CardTitle>

          <CardDescription>
            Organized by: <strong>{event?.organizer?.name}</strong>
          </CardDescription>

          {/* ONLY FULL */}
          {isFull && user && (
            <CardDescription>
              Participant:{" "}
              <strong>
                {user?.name} ({user?.email})
              </strong>
            </CardDescription>
          )}
        </CardHeader>

        {/* IMAGES */}
        {event?.images?.length > 0 && (
          <div className="px-4">
            <ImageMagnifier images={[...event.images].filter(Boolean)} />
          </div>
        )}

        <div className="px-4 space-y-4 pt-5">
          {/* MAIN INFO */}
          <Card className="flex flex-col md:flex-row md:text-start text-center justify-between items-center gap-6 px-4">
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

              <p>
                <span className="font-semibold">Fee:</span>{" "}
                {event?.fee} tk{" "}
                {isFree && (
                  <span className="text-green-600 font-medium">
                    (Free)
                  </span>
                )}
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
                  <p className="text-center pt-3">
                    <span className="font-semibold ">Ticket:</span>{" "}
                    {ticket.status}
                  </p>
                </Card>
              )}


            </div>
          </Card>

          {/* PAYMENT (ONLY FULL) */}
          {isFull && payment?.length > 0 && (
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

        {/* FOOTER PAY BUTTON (PUBLIC ONLY) */}
        {!isFull && !isFree && (
          <CardFooter>
            <Button
              className="w-full"
              disabled={loadingId === event?.id}
              onClick={() =>
                handlePayment({
                  eventId: event?.id,
                })
              }
            >
              {loadingId === event?.id
                ? "Processing..."
                : "Unlock Full Access"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default EventDetailsSmart;