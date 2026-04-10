import { getMyEventsAction } from '@/actions/event.action';
import MyEventsList from '@/components/myEventsList/MyEventsList';
import GlobalPagination from '@/components/shared/GlobalPagination';
import React from 'react';

const MyEventsPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) => {
     const { page, limit } = await searchParams
     const res = await getMyEventsAction(page, limit);
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load products
               </p>
          );
     }

   return (
  <div className="space-y-6 h-full flex flex-col justify-between">
    <MyEventsList myEvents={res?.data?.data} />

    <GlobalPagination
      page={res.data?.meta?.page}
      totalPages={res?.data?.meta?.totalPages}
      limit={res.data?.meta?.limit}
    />
  </div>
);
};

export default MyEventsPage;