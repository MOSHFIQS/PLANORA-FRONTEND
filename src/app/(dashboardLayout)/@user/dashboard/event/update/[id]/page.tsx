import { getOrganizersEventByIdAction } from "@/actions/event.action"
import UpdateEventForm from "@/components/forms/UpdateEventForm"


export default async function UpdateEventPage({
     params,
}: {
     params: Promise<{ id: string }>
}) {
     const { id } = await params

     const res = await getOrganizersEventByIdAction(id)

 
     const event = res?.ok ? res?.data : null


     if (!event) return <p className="p-6">Product not found</p>



     return <UpdateEventForm event={event}  />
}