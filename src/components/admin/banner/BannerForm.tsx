"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBannerAction, updateBannerAction } from "@/actions/banner.action";
import { Event } from "@/types/event.types";
import { AppImage } from "@/components/appImage/AppImage";
import { useAuth } from "@/context/AuthProvider";

interface BannerFormProps {
  mode: "create" | "update";
  featuredEvents?: Event[];
  banner?: any;
}

export default function BannerForm({
  mode,
  featuredEvents = [],
  banner,
}: BannerFormProps) {
  const isCreate = mode === "create";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(
    banner?.image || ""
  );

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://planora-frontend-1.vercel.app";

  const form = useForm({
    defaultValues: {
      title: banner?.title ?? "",
      position: banner?.position ?? "MAIN",
      description: banner?.description ?? "",
      redirectUrl: banner?.redirectUrl ?? "",
      positionOrder: banner?.positionOrder ?? 1,
      buttonText: banner?.buttonText ?? "",
      altText: banner?.altText ?? "",
      dateTime: banner?.dateTime ?? "",
      type: banner?.type || "ONLINE",
      isActive: banner?.isActive ?? true,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const payload = {
          title: value.title,
          description: value.description,
          image: selectedImage,
          redirectUrl: value.redirectUrl,
          position: value.position,
          positionOrder: Number(value.positionOrder),
          buttonText: value.buttonText,
          dateTime: value.dateTime ? new Date(value.dateTime).toISOString() : undefined,
          type: value.type,
          altText: value.altText,
          isActive: value.isActive,
          ...(isCreate && selectedEvent?.id ? { eventId: selectedEvent.id } : {}),
        };

        const res = isCreate
          ? await createBannerAction(payload)
          : await updateBannerAction(banner.id, payload);

        if (!res?.ok) throw new Error(res?.message);

        toast.success(res.message);
        const target =
          user?.role === "SUPERADMIN"
            ? "/super-admin-dashboard/banner"
            : "/admin-dashboard/banner";
        router.push(target);
        if (isCreate) form.reset();
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const availableImages: string[] =
    selectedEvent?.images?.length
      ? selectedEvent.images
      : banner?.event?.images?.length
      ? banner.event.images
      : [];

  return (
    <div>
      <Card className="pt-0">
        <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {isCreate ? "Create Banner" : "Update Banner"}
          </CardTitle>
          <CardDescription>
            {isCreate ? "Add a Banner to Your HomePage" : "Update your homepage banner"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-6"
          >
            {/* EVENT SELECT (Create Mode) */}
            {isCreate && featuredEvents.length > 0 && (
              <div className="space-y-2">
                <Label>Select Event</Label>
                <Select
                  onValueChange={(eventId) => {
                    const event = featuredEvents.find((e) => e.id === eventId);
                    if (!event) return;
                    setSelectedEvent(event);
                    form.setFieldValue("title", event.title);
                    form.setFieldValue("type", event.type);
                    form.setFieldValue("redirectUrl", `${BASE_URL}/events/${event.id}`);
                    form.setFieldValue(
                      "dateTime",
                      new Date(event.dateTime).toISOString()
                    );
                    setSelectedImage(event.images?.[0] || "");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {featuredEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* EVENT IMAGES SELECTION */}
            {availableImages.length > 0 && (
              <div className="space-y-2">
                <Label>Select Image</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                  {availableImages.map((img) => (
                    <div
                      key={img}
                      onClick={() => setSelectedImage(img)}
                      className={`cursor-pointer rounded-md p-1 border-4 transition ${
                        selectedImage === img
                          ? "border-indigo-600 scale-95"
                          : "border-gray-50 hover:border-indigo-300"
                      }`}
                    >
                      <AppImage
                        src={img}
                        alt="event"
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field name="title">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={field.state.value} disabled />
                  </div>
                )}
              </form.Field>

              <form.Field name="redirectUrl">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Redirect URL</Label>
                    <Input value={field.state.value} disabled />
                  </div>
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label>Description</Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write banner description..."
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="positionOrder">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Position Order</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="buttonText">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="type">
                {(field) => (
                  <Field className="gap-2">
                    <Label>Event Type</Label>
                    <Select
                      value={field.state.value}
                      disabled
                      onValueChange={(val: "ONLINE" | "OFFLINE") =>
                        field.handleChange(val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ONLINE">Online</SelectItem>
                        <SelectItem value="OFFLINE">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              </form.Field>

              <form.Field name="altText">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Alt Text</Label>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              {/* Selected Image Preview (Update mode) */}
              {!isCreate && selectedImage && (
                <div className="col-span-1 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Selected Image Preview
                  </Label>
                  <div className="pt-2">
                    <div className="inline-block p-1 border-4 border-indigo-600 rounded">
                      <AppImage
                        src={selectedImage}
                        alt="banner"
                        className="w-32 h-24 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <Button type="submit" disabled={loading}>
              {loading
                ? isCreate ? "Creating..." : "Updating..."
                : isCreate ? "Create Banner" : "Update Banner"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
