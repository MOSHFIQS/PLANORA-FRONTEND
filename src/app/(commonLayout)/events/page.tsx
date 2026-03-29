
import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";

const AllEventsPage = async ({ searchParams }: { searchParams: Promise<{ search?: string; categoryId?: string ; page?: number; limit?: number }> }) => {
     const { search, categoryId, page, limit } = await searchParams
     const searchText = search || "";
     
     console.log("catId",categoryId,searchText);
     const res = await getAllEventsAction(searchText, categoryId, page, limit);
     // console.log(res.data?.data);

     console.log(res.data?.meta);
//      page: 1, limit: 10, total: 7, totalPages: 1}
// limit
// : 
// 10
// page
// : 
// 1
// total
// : 
// 7
// totalPages
// : 
// 1
// [[Prototype]]
// : 
// Object

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
               <HomePageEvents events={res.data?.data}  categories={categories} meta={res.data?.meta} />
          </div>
     );
};

export default AllEventsPage;