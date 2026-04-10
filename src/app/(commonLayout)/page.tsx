
import { getAllBannersAction } from "@/actions/banner.action";
import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import CarouselPlugin from "@/components/home/banner/Banner";
import CategoryCard from "@/components/home/categoryCard/CategoryCard";
import EventsSlider from "@/components/home/eventsSlider/EventsSlider";
import ImageMosaic from "@/components/home/imageMosaic/ImageMosaic";
import PublicStatsCard from "@/components/home/publicStatsCard/PublicStatsCard";
import Features from "@/components/home/features/Features";
import Services from "@/components/home/services/Services";
import HowItWorks from "@/components/home/howItWorks/HowItWorks";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Newsletter from "@/components/home/newsletter/Newsletter";
import FAQ from "@/components/home/faq/FAQ";
import { Banner } from "@/types/banner.types";
import { Event } from "@/types/event.types";
import { getPublicStatsAction } from "@/actions/stat.action";
const HomePage = async () => {
     // const data = await sessionService.getUserFromToken()
     // console.log(data);

     const res = await getAllEventsAction();
     const bannerRes = await getAllBannersAction()
     const categoryRes = await getAllCategoriesAction()
     const publicStatsRes = await getPublicStatsAction()
     // console.log(publicStatsRes);
     // console.log(categoryRes);
     // console.log(res.data);
     const events = res?.data?.data as Event[];
     // console.log(events);
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

               {/* New Section 1: Features */}
               <Features />

               <EventsSlider events={events} />

               {/* New Section 2: Services */}
               <Services />

               <CategoryCard categories={categoryRes.data} />
               
               {/* New Section 3: How It Works */}
               <HowItWorks />

               <PublicStatsCard publicStats={publicStatsRes.data} />

               {/* New Section 4: Testimonials */}
               <Testimonials />

               <ImageMosaic
                    images={[
                         "/img1.jpg",
                         "/img2.jpg",
                         "/img3.jpg",
                    ]}
               />

               {/* New Section 5: FAQ */}
               <FAQ />

               {/* New Section 6: Newsletter */}
               <Newsletter />

          </div>
     );
};

export default HomePage;