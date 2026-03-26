import { apiFetchServerMain } from "@/lib/apiFetchServer";


type CreateReviewPayload = {
  eventId: string;
  rating: number;
  comment?: string;
};

type UpdateReviewPayload = {
  rating?: number;
  comment?: string;
};

export const reviewService = {
  create: (payload: CreateReviewPayload) =>
    apiFetchServerMain("/review", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: UpdateReviewPayload) =>
    apiFetchServerMain(`/review/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  delete: (id: string) =>
    apiFetchServerMain(`/review/${id}`, {
      method: "DELETE",
    }),

  getMyReviews: () =>
    apiFetchServerMain("/review/my", {
      method: "GET",
    }),

  getEventReviews: (eventId: string) =>
    apiFetchServerMain(`/review/event/${eventId}`, {
      method: "GET",
    }),
    
  getOrganizerEventReviewsByEventId: (eventId: string) =>
    apiFetchServerMain(`/review/organizer/events/${eventId}`, {
      method: "GET",
    }),
};