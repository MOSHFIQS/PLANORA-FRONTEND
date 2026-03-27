
import { getAllAdminsAction } from '@/actions/admin.action';
import AllUsers from '@/components/admin/allUsers/AllUsers';
const AllAdminsPage = async () => {

     const res = await getAllAdminsAction();
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

export default AllAdminsPage;