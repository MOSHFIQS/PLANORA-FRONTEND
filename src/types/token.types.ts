export interface TokenPayload {
     userId: string;
     name: string;
     email: string;
     role: "USER" | "ADMIN" | "ORGANIZER" | "SUPERADMIN";
     status: string;
     needPasswordChange: boolean;
     isDeleted: boolean;
     emailVerified: boolean;
     iat: number;
     exp: number;
}
