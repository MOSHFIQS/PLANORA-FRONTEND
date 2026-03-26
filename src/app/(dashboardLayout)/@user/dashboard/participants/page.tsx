
import { getMyEventsAction } from "@/actions/event.action";
import { getMyAllParticipantsAction } from "@/actions/participate.action";
import MyAllEventParticipants from "@/components/myAllEventParticipants/MyAllEventParticipants";
import { Event, Participant } from "@/types/event.types";




const MyAllEventParticipantsPage = async () => {

     const res = await getMyAllParticipantsAction();
     const eventsRes = await getMyEventsAction();
     const participants = res?.data as Participant[];
     const events = eventsRes?.data as Event[];
     // console.log(res);
     // console.log(eventsRes);

     return (
          <MyAllEventParticipants
               participants={participants}
               events={events}
          />
     );
};

export default MyAllEventParticipantsPage;