
import { getMyTicketsAction } from '@/actions/ticket.action';
import MyTickets from '@/components/myTickets/MyTickets';

const MyTicketsPage = async () => {

     const res = await getMyTicketsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Tickets
               </p>
          );
     }


     return <MyTickets data={res?.data?.data} />;
};

export default MyTicketsPage;