
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
     visibility: "PUBLIC" | "PRIVATE";
     type: "ONLINE" | "OFFLINE";
     meetingLink: string;
     organizer?: Organizer;
     fee: number;
     images: string[];
     createdAt: string;
     updatedAt: string;
}
