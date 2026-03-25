import { getMyEventsAction } from '@/actions/participate.action';
import MyJoinedEventsCard from '@/components/myJoinedEventCard/MyJoinedEventsCard';
import PaymentRefreshHandler from '@/components/payment/PaymentRefreshHandler';
export const dynamic = "force-dynamic";


const MyJoinedEventsPage = async () => {
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
               <PaymentRefreshHandler />
               <MyJoinedEventsCard myEvents={res.data} />
          </>
     );
};

export default MyJoinedEventsPage;