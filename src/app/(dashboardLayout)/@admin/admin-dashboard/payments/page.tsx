
import { getAllPaymentsAction } from '@/actions/payment.action';
import PaymentsList from '@/components/payments/PaymentsList';

const AllPaymentsPage = async () => {
     const res = await getAllPaymentsAction();
     console.log(res);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Payments
               </p>
          );
     }

     return <PaymentsList payments={res?.data}  />;
};

export default AllPaymentsPage;