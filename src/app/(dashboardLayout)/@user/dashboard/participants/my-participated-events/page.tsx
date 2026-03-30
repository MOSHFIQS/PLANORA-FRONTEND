import { getMyEventsAction } from '@/actions/participate.action';
import MyParticipatedEventsCard from '@/components/myParticipatedEventsCard/MyParticipatedEventsCard';
import GlobalPagination from '@/components/shared/GlobalPagination';


const MyParticipatedEventsPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) => {
     const { page, limit } = await searchParams;
     const res = await getMyEventsAction(page, limit);
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }

     return (
          <div className="space-y-6 h-full flex flex-col justify-between">
               <MyParticipatedEventsCard myEvents={res?.data?.data} />
               <GlobalPagination
                    page={res.data?.meta?.page}
                    totalPages={res?.data?.meta?.totalPages}
                    limit={res.data?.meta?.limit}
               />
          </div>
     );
};

export default MyParticipatedEventsPage;