
import { getAllCategoriesAction } from "@/actions/category.action";
import AllCategories from "@/components/admin/category/allCategories/AllCategories";


export default async function AllCategoryPage() {
     const res = await getAllCategoriesAction();
     // console.log(res.data);

     if (!res.ok) {
          return (
               <p className="p-6 text-red-600">
                    Failed to load categories
               </p>
          );
     }

     return <AllCategories categories={res.data} />;
}