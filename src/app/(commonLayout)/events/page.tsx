import { getAllCategoriesAction } from "@/actions/category.action";
import { getAllEventsAction } from "@/actions/event.action";
import HomePageEvents from "@/components/homePageEvents/HomePageEvents";

const AllEventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) => {
  const { search = "", category = "ALL" } = await searchParams;

  const res = await getAllEventsAction();
  const categoryRes = await getAllCategoriesAction();

  if (!res?.ok) {
    return <p className="p-6 text-red-600">Failed to load Events</p>;
  }

  return (
    <HomePageEvents
      events={res.data}
      search={search}
      selectedCategoryFromUrl={category}
      categories={categoryRes?.data || []}
    />
  );
};

export default AllEventsPage;