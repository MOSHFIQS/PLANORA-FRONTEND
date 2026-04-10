import { getAllCategoriesAction } from "@/actions/category.action";
import CreateEventForm from "@/components/forms/CreateEventForm";


const CreateProductPage = async () => {
     const res = await getAllCategoriesAction();

     const categories = res?.data || [];
     return (
          <div>
               <CreateEventForm categories={categories} />
          </div>
     );
};

export default CreateProductPage;