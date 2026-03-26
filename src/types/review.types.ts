import { User } from "./user.types";

export type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: User;
};