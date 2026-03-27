
import { getAllEventsAction } from "@/actions/event.action";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";
import { sessionService } from "@/service/token.service";

const AllEventsPage = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
     const { search } = await searchParams
     const res = await getAllEventsAction();
     console.log(res.data);

     const searchText = search || "";

     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }
     return (
          <div>
               <HomePageEvents events={res.data}  search={searchText} />
          </div>
     );
};

export default AllEventsPage;