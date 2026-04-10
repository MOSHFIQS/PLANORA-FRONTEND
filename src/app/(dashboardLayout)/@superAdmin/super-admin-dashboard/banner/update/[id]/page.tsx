import { getBannerByIdAction } from "@/actions/banner.action"
import UpdateBanner from "@/components/admin/banner/update/UpdateBanner"

export default async function UpdateBannerPage({
     params,
}: {
     params: Promise<{ id: string }>
}) {
     const { id } = await params

     const bannerRes = await getBannerByIdAction(id)

     const banner = bannerRes?.ok ? bannerRes?.data : null


     if (!banner) return <p className="p-6">Product not found</p>



     return <UpdateBanner banner={banner}  />
}