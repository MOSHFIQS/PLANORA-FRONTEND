
export type User = {
     id: string;
     name: string;
     email: string;
     phone: string;
     image: string;
     status: "ACTIVE" | "INACTIVE" | "PENDING" | "DELETED";
     roleId: string;
     role: "AGENT" | "ADMIN";
     createdAt: string;
     updatedAt: string;
     deletedAt: string | null;
};
