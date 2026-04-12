
import { getOrganizerStatsAction } from '@/actions/stat.action';
import { OrganizerStatsCard } from '@/components/stats/StatsCard';

const UserStatsPage = async () => {

     const res = await getOrganizerStatsAction();
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Stats
               </p>
          );
     }


     return <OrganizerStatsCard data={res?.data} />;
};

export default UserStatsPage;