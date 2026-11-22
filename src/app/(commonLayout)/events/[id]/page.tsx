import { getSingleEventPublicAction } from "@/actions/event.action";
import EventDetailsSmart from "@/components/common/eventDetailsSmart/EventDetailsSmart";
import Link from "next/link";
import { ArrowLeft, CalendarX } from "lucide-react";

const HomePageEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getSingleEventPublicAction(id);
  const event = res?.ok ? res?.data : null;

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-md border border-slate-200/90 shadow-sm p-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <CalendarX className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Event Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            This event may have been updated, rescheduled, or the link has changed after the latest database refresh.
          </p>
          <div className="pt-2">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse All Events</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <EventDetailsSmart type={event.type} data={event.data} />;
};

export default HomePageEventDetailsPage;
