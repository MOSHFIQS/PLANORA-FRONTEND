
import { getMyInvitationsAction } from "@/actions/invitation.action";
import MyInvitationsCard from "@/components/myInvitationsCard/MyInvitationsCard";
import { Invitation } from "@/types/invitation.types";




const MyInvitationsPage = async () => {

     const res = await getMyInvitationsAction();
     const invitations = res?.data as Invitation[];
     console.log(res);

     return (
          <MyInvitationsCard
               invitations={invitations}
          />
     );
};

export default MyInvitationsPage;