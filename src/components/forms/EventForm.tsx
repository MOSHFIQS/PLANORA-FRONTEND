"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";
import { useState } from "react";

import { createEventAction, updateEventAction } from "@/actions/event.action";
import { useImageUpload } from "@/hooks/useImageUpload";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/shared/imageUtils/imageUploader/ImageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextEditor from "../shared/textEditor/TextEditor";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import AIMagicWriter from "../shared/ai/AIMagicWriter";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string(),
  dateTime: z.string().min(1, "Date & Time is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  type: z.enum(["ONLINE", "OFFLINE"]),
  meetingLink: z.string(),
  categoryId: z.string().min(1, "Category is required"),
  fee: z.number().min(0, "Fee cannot be negative"),
});

export type Category = {
  id: string;
  name: string;
};

type EventFormProps = {
  mode: "create" | "update";
  categories: Category[];
  event?: any;
};

export const EventForm = ({ mode, categories, event }: EventFormProps) => {
  const router = useRouter();
  const isUpdate = mode === "update";

  const eventImages = useImageUpload({
    max: 10,
    defaultImages: event?.images || [],
  });

  const existingDate = event?.dateTime ? new Date(event.dateTime) : undefined;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(existingDate);
  const [selectedTime, setSelectedTime] = useState(
    existingDate ? format(existingDate, "HH:mm:ss") : "10:30:00"
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const combineDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return "";
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours || 0, minutes || 0, seconds || 0);
    return newDate.toISOString();
  };

  const form = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      venue: event?.venue || "",
      dateTime: event?.dateTime ? new Date(event.dateTime).toISOString() : "",
      visibility: (event?.visibility as "PUBLIC" | "PRIVATE") || "PUBLIC",
      type: (event?.type as "ONLINE" | "OFFLINE") || "ONLINE",
      meetingLink: event?.meetingLink || "",
      categoryId: event?.categoryId || "",
      fee: event?.fee || 0,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const actionName = isUpdate ? "Updating" : "Creating";
      const toastId = toast.loading(`${actionName} event...`);

      try {
        const payload = {
          ...value,
          dateTime: new Date(value.dateTime),
          images: eventImages.images
            .filter((img) => !img.imageUploading)
            .map((img) => img.img),
        };

        const res = isUpdate
          ? await updateEventAction(event.id, payload)
          : await createEventAction(payload);

        if (!res?.ok) {
          toast.error(res?.message || `Failed to ${mode} event`, { id: toastId });
          return;
        }

        toast.success(`Event ${isUpdate ? "updated" : "created"} successfully`, { id: toastId });
        router.push("/organizer-dashboard/events");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isUpdate ? "Update Event" : "Create Event"}</CardTitle>
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
            {/* TITLE */}
            <form.Field name="title">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Event Title"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            {/* VENUE */}
            <form.Field name="venue">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Venue</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Event Venue"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            {/* VISIBILITY */}
            <form.Field name="visibility">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Visibility</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val: "PUBLIC" | "PRIVATE") => field.handleChange(val)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            {/* EVENT TYPE */}
            <form.Field name="type">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Event Type</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val: "ONLINE" | "OFFLINE") => field.handleChange(val)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="OFFLINE">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            {/* MEETING LINK */}
            <form.Field name="meetingLink">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                  <Input
                    id={field.name}
                    type="url"
                    placeholder="Meeting Link (if ONLINE)"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>

            {/* FEE */}
            <form.Field name="fee">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Fee</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </div>

          {/* DESCRIPTION */}
          <form.Field name="description">
            {(field) => (
              <Field>
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel>Description *</FieldLabel>
                  <form.Subscribe selector={(state) => [state.values.title, state.values.type, state.values.venue]}>
                    {([title, type, venue]) => (
                      <AIMagicWriter
                        title={title as string}
                        type={type as string}
                        venue={venue as string}
                        onGenerate={field.handleChange}
                      />
                    )}
                  </form.Subscribe>
                </div>
                <TextEditor
                  placeholder="Style your event description here..."
                  value={field.state.value}
                  onChange={field.handleChange}
                  height="300px"
                />
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          </form.Field>

          {/* DATE & TIME */}
          <form.Field name="dateTime">
            {(field) => (
              <FieldGroup className="flex-col">
                <div className="flex gap-4">
                  <Field>
                    <FieldLabel htmlFor="date">Date</FieldLabel>
                    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-32 justify-between font-normal bg-[#F8FAFC]"
                        >
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
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
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                  </Field>
                </div>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </FieldGroup>
            )}
          </form.Field>

          {/* CATEGORY */}
          <form.Field name="categoryId">
            {(field) => (
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={field.state.value || ""}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
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

          <Button variant="violet" type="submit">
            {isUpdate ? "Update Event" : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
