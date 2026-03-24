export type MyJoinedEvent = {
    id: string;
    userId: string;
    eventId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    event: {
        id: string;
        title: string;
        description: string;
        venue: string;
        dateTime: string;
        visibility: "PUBLIC" | "PRIVATE";
        type: "ONLINE" | "OFFLINE";
        meetingLink?: string;
        fee: number;
        images: string[];
        organizerId: string;
        createdAt: string;
        updatedAt: string;
    };
    ticket?: {
        id: string;
        qrCode: string;
        status: "VALID" | "INVALID";
        checkedInAt?: string | null;
    };
    payment?: {
        id: string;
        amount: number;
        status: "SUCCESS" | "FAILED" | "PENDING";
        invoiceUrl?: string | null;
        transactionId: string;
        createdAt: string;
    }[];
};