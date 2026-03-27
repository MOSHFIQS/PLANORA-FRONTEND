import { getAllBannersAction } from "@/actions/banner.action";
import AllBanners from "@/components/admin/banner/allBanner/AllBanners";

export default async function BannersPage() {
  const res = await getAllBannersAction();

  if (!res?.ok) {
    return (
      <p className="p-6 text-red-600">
        Failed to load banners
      </p>
    );
  }

  return <AllBanners banners={res.data} />;
}