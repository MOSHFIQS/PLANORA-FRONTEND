import { getMySingleEventAction } from "@/actions/participate.action";
import MyParticipatedEventDetails from "@/components/myParticipatedEventDetails/MyParticipatedEventDetails";


const MyParticipatedEventDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getMySingleEventAction(id);
  const joinedEventData = res?.ok ? res?.data : null;
  // console.log(joinedEventData);

  if (!joinedEventData) return <p className="p-6">Event not found</p>;

  
  return <MyParticipatedEventDetails joinedEventData={joinedEventData} />;
};

export default MyParticipatedEventDetailsPage;