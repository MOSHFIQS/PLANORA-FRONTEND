export type Invitation = {
  id: string;
  eventId: string;
  userId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;

  event: {
    id: string;
    title: string;
    dateTime: string;
    type: "ONLINE" | "OFFLINE";
    fee: number;
    images: string[];
  };
};