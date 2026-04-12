import { getFeaturedEventsAction } from "@/actions/event.action";
import CreateBanner from "@/components/admin/banner/create/CreateBanner";


const CreateBannerPage = async () => {
  const res = await getFeaturedEventsAction();

  // console.log("res", res);
  
    if (!res?.ok) {
      return (
        <p className="p-6 text-red-600">
          Failed to load featured events
        </p>
      );
    }
  return (
    <div>
      <CreateBanner featuredEvents={res.data} />
    </div>
  );
};

export default CreateBannerPage;