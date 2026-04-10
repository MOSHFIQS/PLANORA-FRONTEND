

import { getAdminStatsAction } from '@/actions/stat.action';
import AdminStatsCard from '@/components/admin/adminStatsCard/AdminStatsCard';
const AdminStatsPage = async () => {

     const res = await getAdminStatsAction();
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Stats
               </p>
          );
     }


     return <AdminStatsCard data={res?.data} />;
};

export default AdminStatsPage;