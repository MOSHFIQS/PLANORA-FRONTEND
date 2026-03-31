"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { createEventAction } from "@/actions/event.action";
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
import { useState } from "react";
import { format } from "date-fns";
import { Label } from "../ui/label";

// -------------------- validation schema --------------------
const formSchema = z.object({
     title: z.string().min(1, "Title is required"),
     description: z.string().min(1, "Description is required"),
     venue: z.string(),              // string only
     dateTime: z.string().min(1, "Date & Time is required"),
     visibility: z.enum(["PUBLIC", "PRIVATE"]),
     type: z.enum(["ONLINE", "OFFLINE"]),
     meetingLink: z.string(),        // string only
     categoryId: z.string().min(1, "Category is required"),       // string only
     fee: z.number().min(0, "Fee cannot be negative"),
});

type Category = {
     id: string;
     name: string;
};


const CreateEventForm = ({ categories }: { categories: Category[] }) => {
     console.log(categories);
     const router = useRouter();
     const eventImages = useImageUpload({ max: 10 });
     const [datePickerOpen, setDatePickerOpen] = useState(false);
     const [selectedDate, setSelectedDate] = useState<Date | undefined>();
     const [selectedTime, setSelectedTime] = useState("10:30:00");

     const combineDateTime = (date?: Date, time?: string) => {
          if (!date || !time) return "";

          const [hours, minutes, seconds] = time.split(":").map(Number);
          const newDate = new Date(date);
          newDate.setHours(hours || 0, minutes || 0, seconds || 0);

          return newDate.toISOString();
     };

     const form = useForm({
          defaultValues: {
               title: "",
               description: "",
               venue: "",
               dateTime: "",
               visibility: "PUBLIC",
               type: "ONLINE",
               meetingLink: "",
               categoryId: "",
               fee: 0,
          },
          validators: {
               onSubmit: formSchema,
          },
          onSubmit: async ({ value }) => {
               const toastId = toast.loading("Creating event...");

               try {
                    const payload = {
                         ...value,
                         dateTime: new Date(value.dateTime),
                         images: eventImages.images
                              .filter((img) => !img.imageUploading)
                              .map((img) => img.img),
                    };
                    console.log(payload);


                    const res = await createEventAction(payload);
                    if (!res?.ok) {
                         toast.error(res?.message, { id: toastId });
                         return;
                    }
                    console.log(res);
                    toast.success("Event created successfully", { id: toastId });
                    router.push("/dashboard/event");
               } catch (err: any) {
                    toast.error("Something went wrong", { id: toastId });
               }
          },
     });

     return (
          <Card>
               <CardHeader>
                    <CardTitle>Create Event</CardTitle>
               </CardHeader>

               <CardContent>
                    <form
                         onSubmit={(e) => {
                              e.preventDefault();
                              form.handleSubmit();
                         }}
                         className="space-y-6"
                    >
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/** TITLE */}
                              <form.Field name="title">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                                  <Input
                                                       id={field.name}
                                                       name={field.name}
                                                       placeholder="Event Title"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                  />
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>



                              {/** VENUE */}
                              <form.Field name="venue">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Venue</FieldLabel>
                                                  <Input
                                                       id={field.name}
                                                       name={field.name}
                                                       placeholder="Event Venue"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                  />
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>



                              <form.Field name="visibility">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Visibility</FieldLabel>
                                                  <Select
                                                       value={field.state.value}
                                                       onValueChange={(val: "PUBLIC" | "PRIVATE") =>
                                                            field.handleChange(val)
                                                       }
                                                  >
                                                       <SelectTrigger id={field.name}>
                                                            <SelectValue placeholder="Select visibility" />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            <SelectItem value="PUBLIC">Public</SelectItem>
                                                            <SelectItem value="PRIVATE">Private</SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>


                              <form.Field name="type">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Event Type</FieldLabel>
                                                  <Select
                                                       value={field.state.value}
                                                       onValueChange={(val: "ONLINE" | "OFFLINE") =>
                                                            field.handleChange(val)
                                                       }
                                                  >
                                                       <SelectTrigger id={field.name}>
                                                            <SelectValue placeholder="Select type" />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            <SelectItem value="ONLINE">Online</SelectItem>
                                                            <SelectItem value="OFFLINE">Offline</SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>

                              {/** MEETING LINK */}
                              <form.Field name="meetingLink">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                                                  <Input
                                                       id={field.name}
                                                       type="url"
                                                       name={field.name}
                                                       placeholder="Meeting Link (if ONLINE)"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                  />
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>

                              {/** FEE */}
                              <form.Field name="fee">
                                   {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                             <Field >
                                                  <FieldLabel htmlFor={field.name}>Fee</FieldLabel>
                                                  <Input
                                                       id={field.name}
                                                       name={field.name}
                                                       type="number"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(Number(e.target.value))}
                                                  />
                                                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                             </Field>
                                        );
                                   }}
                              </form.Field>
                         </div>


                         {/** DESCRIPTION */}
                         <form.Field name="description">
                              {(field) => {
                                   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                   return (
                                        <Field >
                                             <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                             <TextEditor
                                                  placeholder="Style your product description here..."
                                                  value={field.state.value}
                                                  onChange={field.handleChange}
                                                  // error={
                                                  //      field.state.meta.isTouched && field.state.meta.errors?.length
                                                  //           ? String(field.state.meta.errors[0]?.message)
                                                  //           : undefined
                                                  // }
                                                  height="300px"
                                             />
                                             {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                   );
                              }}
                         </form.Field>


                         <form.Field name="dateTime">
                              {(field) => {
                                   const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;

                                   return (
                                        <FieldGroup className="flex-col">
                                             <div className="flex gap-4">
                                                  {/* DATE */}
                                                  <Field>
                                                       <FieldLabel htmlFor="date">Date</FieldLabel>
                                                       <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen} >
                                                            <PopoverTrigger asChild>
                                                                 <Button
                                                                      variant="outline"
                                                                      id="date"
                                                                      className="w-32 justify-between font-normal bg-[#f7f7f7]"
                                                                 >
                                                                      {selectedDate
                                                                           ? format(selectedDate, "PPP")
                                                                           : "Select date"}
                                                                 </Button>
                                                            </PopoverTrigger>

                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                 <Calendar
                                                                      mode="single"
                                                                      selected={selectedDate}
                                                                      captionLayout="dropdown"
                                                                      defaultMonth={selectedDate}
                                                                      onSelect={(date) => {
                                                                           setSelectedDate(date);
                                                                           setDatePickerOpen(false);

                                                                           const combined = combineDateTime(date, selectedTime);
                                                                           if (combined) field.handleChange(combined);
                                                                      }}
                                                                 />
                                                            </PopoverContent>
                                                       </Popover>
                                                  </Field>

                                                  {/* TIME */}
                                                  <Field className="w-32">
                                                       <FieldLabel htmlFor="time">Time</FieldLabel>
                                                       <Input
                                                            type="time"
                                                            id="time"
                                                            step="1"
                                                            value={selectedTime}
                                                            onChange={(e) => {
                                                                 const time = e.target.value;
                                                                 setSelectedTime(time);

                                                                 const combined = combineDateTime(selectedDate, time);
                                                                 if (combined) field.handleChange(combined);
                                                            }}
                                                            className="appearance-none  [&::-webkit-calendar-picker-indicator]:hidden"
                                                       />
                                                  </Field>
                                             </div>

                                             {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </FieldGroup>
                                   );
                              }}
                         </form.Field>

                         {/* CATEGORY */}
                         <form.Field name="categoryId">
                              {(field) => (
                                   <div className="space-y-2">
                                        <Label>Category *</Label>

                                        <Select
                                             value={field.state.value || ""}
                                             onValueChange={(value) => field.handleChange(value)}
                                        >
                                             <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Select Category" />
                                             </SelectTrigger>

                                             <SelectContent>
                                                  {categories?.length > 0 ? (
                                                       categories.map((cat) => (
                                                            <SelectItem
                                                                 key={cat.id}
                                                                 value={cat.id.toString()}
                                                            >
                                                                 {cat.name}
                                                            </SelectItem>
                                                       ))
                                                  ) : (
                                                       <SelectItem value="none" disabled>
                                                            No category found
                                                       </SelectItem>
                                                  )}
                                             </SelectContent>
                                        </Select>

                                        {/* ERROR DISPLAY FIX */}
                                        {field.state.meta.errors?.length > 0 && (
                                             <p className="text-sm text-red-500">
                                                  {field.state.meta.errors[0]?.message}
                                             </p>
                                        )}
                                   </div>
                              )}
                         </form.Field>

                         {/** IMAGES */}
                         <ImageUploader
                              label="Event Images"
                              images={eventImages.images}
                              onUpload={eventImages.upload}
                              onDelete={eventImages.remove}
                              multiple
                         />

                         <Button variant={"violet"} type="submit">Create Event</Button>
                    </form>
               </CardContent>
          </Card>
     );
};

export default CreateEventForm;