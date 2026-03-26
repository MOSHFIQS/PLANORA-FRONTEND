import { getMyEventsAction } from '@/actions/participate.action';
import MyParticipatedEventsCard from '@/components/myParticipatedEventsCard/MyParticipatedEventsCard';


const MyParticipatedEventsPage = async () => {
     const res = await getMyEventsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }

     return (
          <>
               <MyParticipatedEventsCard myEvents={res.data} />
          </>
     );
};

export default MyParticipatedEventsPage;