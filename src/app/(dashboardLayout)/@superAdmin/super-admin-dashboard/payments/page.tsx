
import { getAllPaymentsAction } from '@/actions/payment.action';
import PaymentsList from '@/components/payments/PaymentsList';
import GlobalPagination from '@/components/shared/GlobalPagination';

const AllPaymentsPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) => {
     const { page, limit } = await searchParams;
     const res = await getAllPaymentsAction(page, limit);
     // console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Payments
               </p>
          );
     }


     return (
          <div className="space-y-6 h-full flex flex-col justify-between">
               <PaymentsList payments={res?.data?.data} />
               <GlobalPagination
                    page={res.data?.meta?.page}
                    totalPages={res?.data?.meta?.totalPages}
                    limit={res.data?.meta?.limit}
               />
          </div>
     )


     // return <PaymentsList payments={res?.data?.data}  />;
};

export default AllPaymentsPage;