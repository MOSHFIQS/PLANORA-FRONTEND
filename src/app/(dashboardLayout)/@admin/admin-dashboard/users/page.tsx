
import { getAllUsersAction } from '@/actions/admin.action';
import AllUsers from '@/components/admin/allUsers/AllUsers';
import GlobalPagination from '@/components/shared/GlobalPagination';


const AllUsersPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) => {

     const { page, limit } = await searchParams;
     const res = await getAllUsersAction(page, limit);
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load users
               </p>
          );
     }

     return (
          <div className="space-y-6 h-full flex flex-col justify-between">
               <AllUsers users={res?.data?.data} />
               <GlobalPagination
                    page={res.data?.meta?.page}
                    totalPages={res?.data?.meta?.totalPages}
                    limit={res.data?.meta?.limit}
               />
          </div>
     )

     // return <AllUsers users={res?.data?.data} />;
};

export default AllUsersPage;