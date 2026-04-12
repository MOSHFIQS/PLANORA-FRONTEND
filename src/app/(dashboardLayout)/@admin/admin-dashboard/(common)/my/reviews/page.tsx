
import { getMyReviews} from '@/actions/review.action';
import MyReviews from '@/components/common/myReviews/MyReviews';

const MyReviewsPage = async () => {
     const res = await getMyReviews();
     // console.log(res);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Reviews
               </p>
          );
     }

     return <MyReviews myReviews={res?.data} />;
};

export default MyReviewsPage;