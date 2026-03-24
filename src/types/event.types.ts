
export interface Event {
     id: string;
     title: string;
     description: string;
     venue: string;
     dateTime: Date;
     visibility: "PUBLIC" | "PRIVATE";
     type: "ONLINE" | "OFFLINE";
     meetingLink: string;
     fee: string;
     images: string[];
     createdAt: string;
     updatedAt: string;

}
