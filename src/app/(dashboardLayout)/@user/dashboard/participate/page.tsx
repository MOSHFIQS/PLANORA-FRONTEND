
import { getMyEventsAction } from '@/actions/participate.action';
import MyJoinedEventsList from '@/components/myJoinedEventList/MyJoinedEventsList';

const MyJoinedEventsPage = async () => {

     const res = await getMyEventsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load products
               </p>
          );
     }

     return <MyJoinedEventsList myEvents={res?.data} />;
};

export default MyJoinedEventsPage;