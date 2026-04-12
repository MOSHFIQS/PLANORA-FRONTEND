import { getSingleEventPublicAction } from "@/actions/event.action";
import EventDetailsSmart from "@/components/common/eventDetailsSmart/EventDetailsSmart";


const MyParticipatedEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
     const { id } = await params;
     // console.log(id);
     const res = await getSingleEventPublicAction(id);
     // console.log(res);
     const event = res?.ok ? res?.data : null;
     // console.log(event);

     if (!event) return <p className="p-6">Event not found</p>;



     return <EventDetailsSmart type={event.type} data={event.data} />;
};

export default MyParticipatedEventDetailsPage;
