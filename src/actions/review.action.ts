"use server";

import { reviewService } from "@/service/server/review.server.service";


// CREATE
export async function createReview(payload: {
  eventId: string;
  rating: number;
  comment?: string;
}) {
  try {
    const res = await reviewService.create(payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to create review",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// UPDATE
export async function updateReview(
  id: string,
  payload: { rating?: number; comment?: string }
) {
  try {
    const res = await reviewService.update(id, payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to update review",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// DELETE
export async function deleteReview(id: string) {
  try {
    const res = await reviewService.delete(id);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to delete review",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// MY REVIEWS
export async function getMyReviews() {
  try {
    const res = await reviewService.getMyReviews();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch my reviews",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// EVENT REVIEWS
export async function getEventReviews(eventId: string) {
  try {
    const res = await reviewService.getEventReviews(eventId);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch event reviews",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

export async function getOrganizerEventReviewsByEventId(eventId: string) {
  try {
    const res = await reviewService.getOrganizerEventReviewsByEventId(eventId);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch organizer event reviews",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}