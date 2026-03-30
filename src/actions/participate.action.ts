import { participationService } from "@/service/server/participation.server.service";
import { buildQueryString } from "@/utils/buildQueryString";




export async function getMyEventsAction(page?: number, limit?: number) {
     const query = buildQueryString({
          page,
          limit,
     });
     try {
          const res = await participationService.getMyEvents(query);

          if (!res?.ok) {
               return { ok: false, message: res?.message || "Failed to fetch events" };
          }

          return { ok: true, data: res.data };
     } catch (err: any) {
          return { ok: false, message: err?.message || "Something went wrong" };
     }
}



export async function getEventParticipantsAction(eventId: string) {
     try {
          const res = await participationService.getEventParticipants(eventId);

          if (!res?.ok) {
               return { ok: false, message: res?.message || "Failed to fetch participants" };
          }

          return { ok: true, data: res.data };
     } catch (err: any) {
          return { ok: false, message: err?.message || "Something went wrong" };
     }
}

export async function getMyAllParticipantsAction() {
     try {
          const res = await participationService.getMyAllParticipants();

          if (!res?.ok) {
               return { ok: false, message: res?.message || "Failed" };
          }

          return { ok: true, data: res.data };
     } catch (err: any) {
          return { ok: false, message: err?.message };
     }
}


export async function updateParticipationStatusAction(
     id: string,
     status: "PENDING" | "APPROVED" | "REJECTED"
) {
     try {
          const res = await participationService.updateStatus(id, status);

          if (!res?.ok) {
               return { ok: false, message: res?.message || "Failed to update status" };
          }

          return { ok: true, data: res.data };
     } catch (err: any) {
          return { ok: false, message: err?.message || "Something went wrong" };
     }
}