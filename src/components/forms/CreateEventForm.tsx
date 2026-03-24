"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { createEventAction } from "@/actions/event.action";
import { useImageUpload } from "@/hooks/useImageUpload";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/imageUploader/ImageUploader";

// -------------------- validation schema --------------------
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string(),              // string only
  dateTime: z.string().min(1, "Date & Time is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  type: z.enum(["ONLINE", "OFFLINE"]),
  meetingLink: z.string(),        // string only
  fee: z.number().min(0, "Fee cannot be negative"),
});



const CreateEventForm = () => {
  const router = useRouter();
  const eventImages = useImageUpload({ max: 10 });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      dateTime: "",
      visibility: "PUBLIC",
      type: "ONLINE",
      meetingLink: "",
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
     //    console.log(payload);

        // Uncomment when ready to call API
        const res = await createEventAction(payload);
        if (!res?.ok) {
          toast.error(res?.message, { id: toastId });
          return;
        }
        console.log(res);
        toast.success("Event created successfully", { id: toastId });
        // router.push("/events");
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
          {/** TITLE */}
          <form.Field name="title">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
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

          {/** DESCRIPTION */}
          <form.Field name="description">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Event Description"
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
                <Field data-invalid={isInvalid}>
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

          {/** DATE & TIME */}
          <form.Field name="dateTime">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Date & Time</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="datetime-local"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/** VISIBILITY */}
          <form.Field name="visibility">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Visibility</FieldLabel>
                  <select
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as "PUBLIC" | "PRIVATE")
                    }
                  >
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/** TYPE */}
          <form.Field name="type">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Event Type</FieldLabel>
                  <select
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as "ONLINE" | "OFFLINE")
                    }
                  >
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                  </select>
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
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                  <Input
                    id={field.name}
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
                <Field data-invalid={isInvalid}>
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

          {/** IMAGES */}
          <ImageUploader
            label="Event Images"
            images={eventImages.images}
            onUpload={eventImages.upload}
            onDelete={eventImages.remove}
            multiple
          />

          <Button type="submit">Create Event</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventForm;