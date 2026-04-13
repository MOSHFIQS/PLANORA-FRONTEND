
export type User = {
    id: string;
     name: string;
     email: string;
     emailVerified: boolean;
     image: string ;
     createdAt: string;
     updatedAt: string;
     role: "USER" | "ADMIN" | "ORGANIZER" | "SUPERADMIN"; 
     status: string;
     needPasswordChange: boolean;
     isDeleted: boolean;
     deletedAt: string | null;
};
