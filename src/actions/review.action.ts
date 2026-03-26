import { reviewService } from "@/service/review.server.service";


export const reviewAction = {
  createReview: async (payload: { eventId: string; rating: number; comment?: string }) => {
    try {
      const res = await reviewService.create(payload);

      if (!res?.ok) {
        return { ok: false, message: res?.message || "Failed to create review" };
      }

      return { ok: true, data: res.data  };
    } catch (err) {
      return { ok: false, message: "Something went wrong" };
    }
  },

  updateReview: async (id: string, payload: { rating?: number; comment?: string }) => {
    try {
      const res = await reviewService.update(id, payload);

      if (!res?.ok) {
        return { ok: false, message: res?.message || "Failed to update review" };
      }

      return { ok: true, data: res.data  };
    } catch {
      return { ok: false, message: "Something went wrong" };
    }
  },

  deleteReview: async (id: string) => {
    try {
      const res = await reviewService.delete(id);

      if (!res?.ok) {
        return { ok: false, message: res?.message || "Failed to delete review" };
      }

      return { ok: true };
    } catch {
      return { ok: false, message: "Something went wrong" };
    }
  },

  getMyReviews: async () => {
    try {
      const res = await reviewService.getMyReviews();

      if (!res?.ok) {
        return { ok: false, message: res?.message || "Failed to fetch my reviews" };
      }

      return { ok: true, data: res.data };
    } catch {
      return { ok: false, message: "Something went wrong" };
    }
  },

  getEventReviews: async (eventId: string) => {
    try {
      const res = await reviewService.getEventReviews(eventId);

      if (!res?.ok) {
        return { ok: false, message: res?.message || "Failed to fetch event reviews" };
      }

      return { ok: true, data: res.data };
    } catch {
      return { ok: false, message: "Something went wrong" };
    }
  },
};