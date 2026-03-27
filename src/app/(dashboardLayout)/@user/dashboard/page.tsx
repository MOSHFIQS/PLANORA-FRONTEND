
import { getUserStatsAction } from '@/actions/user.action';
import UserStatsCard from '@/components/user/userStatsCard/UserStatsCard';

const UserStatsPage = async () => {

     const res = await getUserStatsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Stats
               </p>
          );
     }


     return <UserStatsCard data={res?.data} />;
};

export default UserStatsPage;