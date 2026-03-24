"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MyJoinedEvent } from "@/types/joinedEvent.types";

type Props = {
    myEvents: MyJoinedEvent[];
};

const MyJoinedEventsList = ({ myEvents }: Props) => {
    if (!myEvents || myEvents.length === 0) {
        return <p className="p-6 text-gray-500">You haven't joined any events yet.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {myEvents.map((joinedEvent) => {
                const { event, ticket, payment, status } = joinedEvent;
                const date = new Date(event?.dateTime);

                return (
                    <Card key={joinedEvent.id} className="shadow-sm">
                        <CardHeader>
                            <CardTitle>{event?.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {event?.images && event?.images[0] && (
                                <img
                                    src={event?.images[0]}
                                    alt={event?.title}
                                    className="w-full h-40 object-cover rounded-md mb-2"
                                />
                            )}

                            <p>
                                {/* <strong>Date:</strong> {format(date, "PPP")} */}
                            </p>
                            <p>
                                {/* <strong>Time:</strong> {format(date, "p")} */}
                            </p>
                            <p>
                                <strong>Venue:</strong> {event?.venue}
                            </p>
                            <p>
                                <strong>Type:</strong> {event?.type}
                            </p>
                            <p>
                                <strong>Fee:</strong> {event?.fee} tk
                            </p>
                            <p>
                                <strong>Participation Status:</strong> {status}
                            </p>
                            {ticket && (
                                <p>
                                    <strong>Ticket Status:</strong> {ticket?.status}
                                </p>
                            )}
                            {payment && payment.length > 0 && (
                                <p>
                                    <strong>Payment:</strong>{" "}
                                    {payment[0]?.status} ({payment[0]?.amount} tk)
                                </p>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default MyJoinedEventsList;