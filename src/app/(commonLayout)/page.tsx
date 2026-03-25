
import { getAllEventsAction } from "@/actions/event.action";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";
import { sessionService } from "@/service/token.service";

const HomePage = async () => {
     // const data = await sessionService.getUserFromToken()
     // console.log(data);

     const res = await getAllEventsAction();
     console.log(res.data);

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }
     return (
          <div>


               Home
               <HomePageEvents events={res.data} />

          </div>
     );
};

export default HomePage;