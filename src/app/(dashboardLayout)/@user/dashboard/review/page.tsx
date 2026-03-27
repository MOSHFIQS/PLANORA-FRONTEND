
import { getMyReviews, getOrganizerEventReviewsByEventId } from '@/actions/review.action';
import EventReviews from '@/components/eventReviews/EventReviews';

const MyReviewsPage = async () => {
     const res = await getMyReviews();
     console.log(res);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Reviews
               </p>
          );
     }

     return <EventReviews organizersReviews={res?.data}  />;
};

export default MyReviewsPage;