
export type User = {
    id: string;
     name: string;
     email: string;
     emailVerified: boolean;
     image: string ;
     createdAt: string;
     updatedAt: string;
     role: "USER" | "ADMIN"; // adjust if more roles exist
     status: string;
     isDeleted: boolean;
     deletedAt: string | null;
};
