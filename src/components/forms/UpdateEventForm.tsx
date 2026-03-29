"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { updateEventAction } from "@/actions/event.action";
import { useImageUpload } from "@/hooks/useImageUpload";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import TextEditor from "../textEditor/TextEditor";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";

// -------------------- validation --------------------
const formSchema = z.object({
     title: z.string().min(1),
     description: z.string().min(1),
     venue: z.string(),
     dateTime: z.string().min(1),
     visibility: z.enum(["PUBLIC", "PRIVATE"]),
     type: z.enum(["ONLINE", "OFFLINE"]),
     meetingLink: z.string(),
     categoryId: z.string().min(1, "Category is required"),
     fee: z.number().min(0),
});

type Category = {
     id: string;
     name: string;
};


type Props = {
     event: any;
     categories: Category[]
};

const UpdateEventForm = ({ event, categories }: Props) => {
     const router = useRouter();

     const eventImages = useImageUpload({
          max: 10,
          defaultImages: event?.images || [],
     });

     const existingDate = event?.dateTime ? new Date(event.dateTime) : undefined;

     const [selectedDate, setSelectedDate] = useState<Date | undefined>(
          existingDate
     );

     const [selectedTime, setSelectedTime] = useState(
          existingDate
               ? format(existingDate, "HH:mm:ss")
               : "10:30:00"
     );

     const [datePickerOpen, setDatePickerOpen] = useState(false);

     const combineDateTime = (date?: Date, time?: string) => {
          if (!date || !time) return "";

          const [h, m, s] = time.split(":").map(Number);
          const d = new Date(date);
          d.setHours(h || 0, m || 0, s || 0);

          return d.toISOString();
     };



     const form = useForm({
          defaultValues: {
               title: event?.title || "",
               description: event?.description || "",
               venue: event?.venue || "",
               dateTime: event?.dateTime
                    ? new Date(event.dateTime).toISOString()
                    : "",
               visibility: event?.visibility || "PUBLIC",
               type: event?.type || "ONLINE",
               meetingLink: event?.meetingLink || "",
               categoryId: event?.categoryId || "",
               fee: event?.fee || 0,
          },
          validators: {
               onSubmit: formSchema,
          },
          onSubmit: async ({ value }) => {
               const toastId = toast.loading("Updating event...");

               try {
                    const payload = {
                         ...value,
                         dateTime: new Date(value.dateTime),
                         images: eventImages.images
                              .filter((img) => !img.imageUploading)
                              .map((img) => img.img),
                    };

                    const res = await updateEventAction(event.id, payload);

                    if (!res?.ok) {
                         toast.error(res?.message, { id: toastId });
                         return;
                    }

                    toast.success("Event updated successfully", {
                         id: toastId,
                    });

                    router.push("/dashboard/event");
               } catch (err) {
                    toast.error("Something went wrong", { id: toastId });
               }
          },
     });

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Update Event</CardTitle>
               </CardHeader>

               <CardContent>
                    <form
                         onSubmit={(e) => {
                              e.preventDefault();
                              form.handleSubmit();
                         }}
                         className="space-y-6"
                    >
                         <div className="grid grid-cols-2 gap-4">
                              {/* TITLE */}
                              <form.Field name="title">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Title</FieldLabel>
                                             <Input
                                                  value={field.state.value}
                                                  onChange={(e) =>
                                                       field.handleChange(
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                             <FieldError
                                                  errors={
                                                       field.state.meta.errors
                                                  }
                                             />
                                        </Field>
                                   )}
                              </form.Field>

                              {/* VENUE */}
                              <form.Field name="venue">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Venue</FieldLabel>
                                             <Input
                                                  value={field.state.value}
                                                  onChange={(e) =>
                                                       field.handleChange(
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                             <FieldError
                                                  errors={
                                                       field.state.meta.errors
                                                  }
                                             />
                                        </Field>
                                   )}
                              </form.Field>

                              {/* VISIBILITY */}
                              <form.Field name="visibility">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Visibility</FieldLabel>
                                             <Select
                                                  value={field.state.value}
                                                  onValueChange={(val: any) =>
                                                       field.handleChange(val)
                                                  }
                                             >
                                                  <SelectTrigger>
                                                       <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       <SelectItem value="PUBLIC">
                                                            Public
                                                       </SelectItem>
                                                       <SelectItem value="PRIVATE">
                                                            Private
                                                       </SelectItem>
                                                  </SelectContent>
                                             </Select>
                                        </Field>
                                   )}
                              </form.Field>

                              {/* TYPE */}
                              <form.Field name="type">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Type</FieldLabel>
                                             <Select
                                                  value={field.state.value}
                                                  onValueChange={(val: any) =>
                                                       field.handleChange(val)
                                                  }
                                             >
                                                  <SelectTrigger>
                                                       <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       <SelectItem value="ONLINE">
                                                            Online
                                                       </SelectItem>
                                                       <SelectItem value="OFFLINE">
                                                            Offline
                                                       </SelectItem>
                                                  </SelectContent>
                                             </Select>
                                        </Field>
                                   )}
                              </form.Field>

                              {/* MEETING LINK */}
                              <form.Field name="meetingLink">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Meeting Link</FieldLabel>
                                             <Input
                                                  value={field.state.value}
                                                  onChange={(e) =>
                                                       field.handleChange(
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                        </Field>
                                   )}
                              </form.Field>

                              {/* FEE */}
                              <form.Field name="fee">
                                   {(field) => (
                                        <Field>
                                             <FieldLabel>Fee</FieldLabel>
                                             <Input
                                                  type="number"
                                                  value={field.state.value}
                                                  onChange={(e) =>
                                                       field.handleChange(
                                                            Number(
                                                                 e.target.value
                                                            )
                                                       )
                                                  }
                                             />
                                        </Field>
                                   )}
                              </form.Field>
                         </div>

                         {/* DESCRIPTION */}
                         <form.Field name="description">
                              {(field) => (
                                   <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <TextEditor
                                             value={field.state.value}
                                             onChange={field.handleChange}
                                             height="300px"
                                        />
                                   </Field>
                              )}
                         </form.Field>

                         {/* DATE TIME */}
                         <form.Field name="dateTime">
                              {(field) => (
                                   <FieldGroup className="flex-col">
                                        <div className="flex gap-4">
                                             <Field>
                                                  <FieldLabel>Date</FieldLabel>
                                                  <Popover
                                                       open={datePickerOpen}
                                                       onOpenChange={
                                                            setDatePickerOpen
                                                       }
                                                  >
                                                       <PopoverTrigger asChild>
                                                            <Button variant="outline">
                                                                 {selectedDate
                                                                      ? format(
                                                                           selectedDate,
                                                                           "PPP"
                                                                      )
                                                                      : "Select"}
                                                            </Button>
                                                       </PopoverTrigger>

                                                       <PopoverContent>
                                                            <Calendar
                                                                 mode="single"
                                                                 selected={
                                                                      selectedDate
                                                                 }
                                                                 onSelect={(
                                                                      date
                                                                 ) => {
                                                                      setSelectedDate(
                                                                           date
                                                                      );
                                                                      const combined =
                                                                           combineDateTime(
                                                                                date,
                                                                                selectedTime
                                                                           );
                                                                      if (
                                                                           combined
                                                                      )
                                                                           field.handleChange(
                                                                                combined
                                                                           );
                                                                 }}
                                                            />
                                                       </PopoverContent>
                                                  </Popover>
                                             </Field>

                                             <Field>
                                                  <FieldLabel>Time</FieldLabel>
                                                  <Input
                                                       type="time"
                                                       step="1"
                                                       value={selectedTime}
                                                       onChange={(e) => {
                                                            const time =
                                                                 e.target.value;
                                                            setSelectedTime(
                                                                 time
                                                            );

                                                            const combined =
                                                                 combineDateTime(
                                                                      selectedDate,
                                                                      time
                                                                 );
                                                            if (combined)
                                                                 field.handleChange(
                                                                      combined
                                                                 );
                                                       }}
                                                  />
                                             </Field>
                                        </div>
                                   </FieldGroup>
                              )}
                         </form.Field>

                         <form.Field name="categoryId">
                              {(field) => (
                                   <div className="space-y-2">
                                        <Label>Category</Label>

                                        <Select
                                             value={field.state.value}
                                             onValueChange={(value) => field.handleChange(value)}
                                        >
                                             <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Select Category" />
                                             </SelectTrigger>

                                             <SelectContent>
                                                  {categories.map((cat) => (
                                                       <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                       </SelectItem>
                                                  ))}
                                             </SelectContent>
                                        </Select>

                                        {/* ERROR MESSAGE */}
                                        {field.state.meta.errors?.length > 0 && (
                                             <p className="text-sm text-red-500">
                                                  {field.state.meta.errors[0]?.message}
                                             </p>
                                        )}
                                   </div>
                              )}
                         </form.Field>

                         {/* IMAGES */}
                         <ImageUploader
                              label="Event Images"
                              images={eventImages.images}
                              onUpload={eventImages.upload}
                              onDelete={eventImages.remove}
                              multiple
                         />

                         <Button variant={"violet"} type="submit">
                              Update Event
                         </Button>
                    </form>
               </CardContent>
          </Card>
     );
};

export default UpdateEventForm;