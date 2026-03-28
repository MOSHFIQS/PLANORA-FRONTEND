export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  | "CANCELED"
  | "UNPAID";

export interface Event {
  id: string;
  title: string;
}

export interface Participation {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  createdAt: string;
  event?: Event;
}

export interface Invitation {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  createdAt: string;
  event?: Event;
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  transactionId: string;
  stripeEventId?: string | null;
  invoiceUrl?: string | null;
  createdAt: string;
  updatedAt: string;

  userId: string;

  participation?: Participation | null;
  participationId?: string | null;

  invitation?: Invitation | null;
  invitationId?: string | null;
}