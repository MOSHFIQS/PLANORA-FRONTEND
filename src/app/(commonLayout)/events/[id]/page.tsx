import { getSingleEventPublicAction } from "@/actions/event.action";
import EventDetailsSmart from "@/components/eventDetailsSmart/EventDetailsSmart";


const HomePageEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getSingleEventPublicAction(id);
  const event = res?.ok ? res?.data : null;
  // console.log(event);

  if (!event) return <p className="p-6">Event not found</p>;



  return <EventDetailsSmart type={event.type} data={event.data} />;
};

export default HomePageEventDetailsPage;
