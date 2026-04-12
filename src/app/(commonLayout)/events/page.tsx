
import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import CategoryButtons from "@/components/home/categoryButtons/CategoryButtons";
import HomePageEvents from "@/components/home/homePageEvents/HomePageEvents";
import GlobalPagination from "@/components/shared/GlobalPagination";

const AllEventsPage = async ({ searchParams }: { searchParams: Promise<{ search?: string; categoryId?: string; page?: number; limit?: number }> }) => {
     const { search, categoryId, page, limit } = await searchParams
     const searchText = search || "";

     // console.log("catId", categoryId, searchText);
     const res = await getAllEventsAction(searchText, categoryId, page, limit);

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
          <div className="space-y-6 py-5">
               <CategoryButtons categories={categoryRes.data || []} />
               <HomePageEvents events={res.data?.data} />
               <GlobalPagination
                    page={res.data?.meta?.page}
                    totalPages={res?.data?.meta?.totalPages}
                    limit={res.data?.meta?.limit}
               />
          </div>
     );
};

export default AllEventsPage;