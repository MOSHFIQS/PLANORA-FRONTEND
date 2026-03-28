
import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";

const AllEventsPage = async ({ searchParams }: { searchParams: Promise<{ search?: string; categoryId?: string }> }) => {
     const { search, categoryId } = await searchParams
     const searchText = search || "";
     
     console.log("catId",categoryId,searchText);
     const res = await getAllEventsAction(searchText, categoryId);
     console.log(res.data);

     const categoryRes = await getAllCategoriesAction();

     const categories = categoryRes?.data || [];


     if (!res?.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load Events
               </p>
          );
     }
     return (
          <div>
               <HomePageEvents events={res.data}  categories={categories} />
          </div>
     );
};

export default AllEventsPage;