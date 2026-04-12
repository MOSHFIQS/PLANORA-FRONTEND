
import { getMyInvitationsAction } from "@/actions/invitation.action";
import MyInvitationsCard from "@/components/common/myInvitationsCard/MyInvitationsCard";
import GlobalPagination from "@/components/shared/GlobalPagination";
import { Invitation } from "@/types/invitation.types";




const MyInvitationsPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number; search?: string }> }) => {
     const { page, limit, search } = await searchParams
     const searchTerm = search || "";
     const res = await getMyInvitationsAction(page, limit, searchTerm);
     const invitations = res?.data?.data as Invitation[];
     // console.log(res);

     return (
          <div className="space-y-6 h-full flex flex-col justify-between">
               <MyInvitationsCard invitations={invitations} />
               <GlobalPagination
                    page={res.data?.meta?.page}
                    totalPages={res?.data?.meta?.totalPages}
                    limit={res.data?.meta?.limit}
               />
          </div>
     );
};

export default MyInvitationsPage;