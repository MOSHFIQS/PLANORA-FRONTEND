// types/joinedEvent.types.ts

export type Payment = {
  id: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: string;
  invoiceUrl?: string | null;
  transactionId?: string;
};

export type Ticket = {
  id: string;
  userId: string;
  eventId: string;
  participationId: string;
  qrCode: string;
  status: "VALID" | "INVALID" | "USED";
  checkedInAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type Organizer = {
  id: string;
  name: string;
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  venue?: string;
  dateTime: string;
  type: "ONLINE" | "OFFLINE";
  fee: number;
  images?: string[];
  meetingLink?: string;
  organizerId: string;
  organizer?: Organizer;
};

export type MyJoinedEvent = {
  id: string;
  userId: string;
  eventId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user?: User;
  event?: Event;
  ticket?: Ticket;
  payment?: Payment[];
};