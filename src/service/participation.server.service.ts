import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const participationService = {
     // 1. Get events the current user is participating in
     getMyEvents: () =>
          apiFetchServerMain("/participation/my-events", {
               method: "GET",
          }),

     getMySingleEvent: (id: string) =>
          apiFetchServerMain(`/participation/me/${id}`, { method: "GET" }),
     
     getMyAllParticipants: () =>
          apiFetchServerMain("/participation/my-all-participants"),

     // 2. Get participants for a specific event (organizer/admin)
     getEventParticipants: (eventId: string) =>
          apiFetchServerMain(`/participation/event/${eventId}`, {
               method: "GET",
          }),

     // 3. Update participation status
     updateStatus: (id: string, status: "PENDING" | "APPROVED" | "REJECTED") =>
          apiFetchServerMain(`/participation/${id}/status`, {
               method: "PATCH",
               body: JSON.stringify({ status }),
          }),
};