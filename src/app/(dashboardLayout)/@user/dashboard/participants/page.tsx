
import { getMyEventsAction } from "@/actions/event.action";
import { getMyAllParticipantsAction } from "@/actions/participate.action";
import MyAllEventParticipants from "@/components/myAllEventParticipants/MyAllEventParticipants";
import { Event, Participant } from "@/types/event.types";




const MyAllEventParticipantsPage = async () => {

     const res = await getMyAllParticipantsAction();
     const eventsRes = await getMyEventsAction();
     const participants = res?.data 
     const events = eventsRes?.data?.data
     console.log(participants);
     console.log(events);

     return (
          <MyAllEventParticipants
               participants={participants}
               events={events}
          />
     );
};

export default MyAllEventParticipantsPage;