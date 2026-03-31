"use server";

import { ticketService } from "@/service/server/ticket.server.service";


//  Get My Tickets
export async function getMyTicketsAction() {
  try {
    const res = await ticketService.getMyTickets();
    // console.log(res);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch tickets",
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

//  Get Event Tickets
export async function getEventTicketsAction(eventId: string) {
  try {
    const res = await ticketService.getEventTickets(eventId);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch event tickets",
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

export async function checkInTicketAction(qrCode: string) {
  try {
    const res = await ticketService.checkInTicket(qrCode);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Check-in failed",
      };
    }

    return {
      ok: true,
      message: res.message,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}