
import { getMyProfileAction } from '@/actions/profile.action';
import MyProfile from '@/components/shared/myProfile/MyProfile';
const UserProfilePage = async () => {

     const res = await getMyProfileAction();
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Profile Info
               </p>
          );
     }

     return <MyProfile profileData={res?.data} />;
};

export default UserProfilePage;