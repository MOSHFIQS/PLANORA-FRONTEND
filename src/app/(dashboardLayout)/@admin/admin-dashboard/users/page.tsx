
import { getAllUsersAction } from '@/actions/admin.action';
import AllUsers from '@/components/admin/allUsers/AllUsers';
const AllUsersPage = async () => {

     const res = await getAllUsersAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load users
               </p>
          );
     }

     return <AllUsers users={res?.data} />;
};

export default AllUsersPage;