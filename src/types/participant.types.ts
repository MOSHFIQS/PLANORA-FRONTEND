import { Event } from "./event.types";
import { User } from "./user.types";

export type Participant = {
   id: string;
    userId: string;
    eventId: string;
    status: "APPROVED" | "PENDING" | "REJECTED"; // use other statuses if exist
    createdAt: string; // ISO date string
    user: User;
    event: Event;
};