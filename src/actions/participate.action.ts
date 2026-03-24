import { participationService } from "@/service/participation.server.service";



export async function getMyEventsAction() {
     try {
          const res = await participationService.getMyEvents();

          if (!res?.ok) {
               return { ok: false, message: res?.message || "Failed to fetch events" };
          }

          return { ok: true, data: res.data };
     } catch (err: any) {
          return { ok: false, message: err?.message || "Something went wrong" };
     }
}
export async function getMySingleEventAction(id: string) {
    try {
        const res = await participationService.getMySingleEvent(id);

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch participation" };
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