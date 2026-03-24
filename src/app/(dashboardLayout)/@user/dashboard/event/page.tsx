import { getMyEventsAction } from '@/actions/event.action';
import MyEventsList from '@/components/myEventsList/MyEventsList';
import React from 'react';

const MyEventsPage = async () => {

     const res = await getMyEventsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load products
               </p>
          );
     }

     return <MyEventsList myEvents={res?.data} />;
};

export default MyEventsPage;