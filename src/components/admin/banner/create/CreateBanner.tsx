"use client";

import BannerForm from "../BannerForm";
import { Event } from "@/types/event.types";

export default function CreateBanner({
  featuredEvents,
}: {
  featuredEvents: Event[];
}) {
  return <BannerForm mode="create" featuredEvents={featuredEvents} />;
}
