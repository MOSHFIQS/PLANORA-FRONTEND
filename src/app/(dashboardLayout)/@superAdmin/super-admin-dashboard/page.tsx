

import { getSuperAdminStatsAction } from '@/actions/stat.action';
import { SuperAdminStatsCard } from '@/components/stats/StatsCard';
const AdminStatsPage = async () => {

     const res = await getSuperAdminStatsAction();
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Stats
               </p>
          );
     }


     return <SuperAdminStatsCard data={res?.data} />;
};

export default AdminStatsPage;