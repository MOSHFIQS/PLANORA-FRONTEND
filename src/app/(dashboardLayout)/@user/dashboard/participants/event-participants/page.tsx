
import { getMyAllParticipantsAction } from "@/actions/participate.action";
import MyAllEventParticipants from "@/components/myAllEventParticipants/MyAllEventParticipants";
import { Participant } from "@/types/participant.types";




const MyAllEventParticipantsPage = async () => {

     const res = await getMyAllParticipantsAction();
     const participants = res?.data as Participant[];


     

     return (
          <MyAllEventParticipants
               participants={participants}
          />
     );
};

export default MyAllEventParticipantsPage;