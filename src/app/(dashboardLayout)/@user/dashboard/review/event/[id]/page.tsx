
import { getOrganizerEventReviewsByEventId } from '@/actions/review.action';
import EventReviews from '@/components/eventReviews/EventReviews';

const OrganizersReviewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
     const { id } = await params
     // console.log(id);
     const res = await getOrganizerEventReviewsByEventId(id);
     // console.log(res);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Reviews
               </p>
          );
     }

     return <EventReviews organizersReviews={res?.data}  />;
};

export default OrganizersReviewsPage;