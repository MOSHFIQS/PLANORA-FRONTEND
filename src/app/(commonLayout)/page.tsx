
import { getAllBannersAction } from "@/actions/banner.action";
import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import { getPublicStatsAction } from "@/actions/public.action";
import CarouselPlugin from "@/components/home/banner/Banner";
import CategoryCard from "@/components/home/categoryCard/CategoryCard";
import EventsSlider from "@/components/home/eventsSlider/EventsSlider";
import ImageMosaic from "@/components/home/imageMosaic/ImageMosaic";
import PublicStatsCard from "@/components/home/publicStatsCard/PublicStatsCard";
import { Banner } from "@/types/banner.types";
import { Event } from "@/types/event.types";

const HomePage = async () => {
     // const data = await sessionService.getUserFromToken()
     // console.log(data);

     const res = await getAllEventsAction();
     const bannerRes = await getAllBannersAction()
     const categoryRes = await getAllCategoriesAction()
     const publicStatsRes = await getPublicStatsAction()
     console.log(publicStatsRes);
     // console.log(categoryRes);
     // console.log(res.data);
     const events = res?.data?.data as Event[];
     console.log(events);
     const banners = bannerRes?.data as Banner[];


     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }
     return (
          <div className="space-y-10">


               <CarouselPlugin banners={banners} />
               {/* <HomePageEvents events={events} search={""} categories={[]} /> */}

               <EventsSlider events={events} />
               <CategoryCard categories={categoryRes.data} />
               <PublicStatsCard publicStats={publicStatsRes.data} />
               <ImageMosaic
                    images={[
                         "/img1.jpg",
                         "/img2.jpg",
                         "/img3.jpg",
                    ]}
               />

          </div>
     );
};

export default HomePage;