import { getOrganizersEventByIdAction } from "@/actions/event.action";
import EventDetails from "@/components/eventDetails/EventDetails";


const HomePageEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getOrganizersEventByIdAction(id);
  const event = res?.ok ? res?.data : null;
  console.log(event);

  if (!event) return <p className="p-6">Event not found</p>;

  return <EventDetails event={event} />;
};

export default HomePageEventDetailsPage;
