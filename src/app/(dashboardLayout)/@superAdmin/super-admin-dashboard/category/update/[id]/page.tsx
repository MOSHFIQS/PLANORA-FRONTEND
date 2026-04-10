import { getSingleCategoryAction } from "@/actions/category.action"
import UpdateCategory from "@/components/admin/category/update/UpdateCategory"

export default async function UpdateCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const catRes = await getSingleCategoryAction(id)

    const category = catRes.ok ? catRes?.data : null

    if (!category) return <p className="p-6">Category not found</p>

    return <UpdateCategory category={category} />
}