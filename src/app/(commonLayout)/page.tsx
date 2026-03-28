
import { getAllBannersAction } from "@/actions/banner.action";
import { getAllEventsAction } from "@/actions/event.action";
import CarouselPlugin from "@/components/home/banner/Banner";
import EventsSlider from "@/components/home/eventsSlider/EventsSlider";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";
import { sessionService } from "@/service/token.service";
import { Banner } from "@/types/banner.types";
import { Event } from "@/types/event.types";

const HomePage = async () => {
     // const data = await sessionService.getUserFromToken()
     // console.log(data);

     const res = await getAllEventsAction();
     const bannerRes = await getAllBannersAction()
     console.log(res.data);
     const events = res?.data as Event[];
     const banners = bannerRes?.data as Banner[];

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }
     return (
          <div className="my-100">


               <CarouselPlugin banners={banners} />
               {/* <HomePageEvents events={events} search={""} categories={[]} /> */}

               <EventsSlider events={events} />

          </div>
     );
};

export default HomePage;