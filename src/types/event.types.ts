
export type Organizer = {
  id: string;
  name: string;
};

export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  dateTime: Date;
  categoryId: string;
  visibility: "PUBLIC" | "PRIVATE";
  type: "ONLINE" | "OFFLINE";
  meetingLink: string;
  organizer?: Organizer;
  fee: number;
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}


// Participant-specific event wrapper
export interface ParticipantEvent {
  eventId: string;
  title: string;
  invited: boolean;              // true if this user was invited
  participationStatus: "PENDING" | "APPROVED" | "REJECTED" | "BANNED" | null;
  invitationStatus?: "PENDING" | "ACCEPTED" | "DECLINED" | null; // optional if needed
}

// Participant type for frontend
export interface Participant {
  id: string;
  name: string;
  email: string;
  image?: string;
  events: ParticipantEvent[];
}