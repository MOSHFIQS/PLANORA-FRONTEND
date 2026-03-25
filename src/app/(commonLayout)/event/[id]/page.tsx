import { getSingleEventPublicAction } from "@/actions/event.action";
import EventDetails from "@/components/eventDetails/EventDetails";
import HomePageEventDetails from "@/components/homePageEventDetails/HomePageEventDetails";


const HomePageEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getSingleEventPublicAction(id);
  const event = res?.ok ? res?.data : null;
  console.log(event);

  if (!event) return <p className="p-6">Event not found</p>;



  return <HomePageEventDetails event={event} />;
};

export default HomePageEventDetailsPage;
