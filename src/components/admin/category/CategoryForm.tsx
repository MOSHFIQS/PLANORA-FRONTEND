"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategoryAction, updateCategoryAction } from "@/actions/category.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/components/shared/imageUtils/imageUploader/ImageUploader";
import { useAuth } from "@/context/AuthProvider";

interface CategoryFormProps {
  mode: "create" | "update";
  category?: any;
}

export default function CategoryForm({ mode, category }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const isCreate = mode === "create";
  const categoryImages = useImageUpload({
    max: 1,
    defaultImages: category?.image ? [category.image] : undefined,
  });
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const payload = {
          ...value,
          image: categoryImages.images[0]?.img,
        };

        const res = isCreate
          ? await createCategoryAction(payload)
          : await updateCategoryAction(category.id, payload);

        if (!res.ok) throw new Error(res.message);

        const target = user?.role === "SUPERADMIN" ? "/super-admin-dashboard/category" : "/admin-dashboard/category";
        router.push(target);
        toast.success(res.message);
        if (isCreate) form.reset();
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <Card className="pt-0">
        <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {isCreate ? "Create Category" : "Update Category"}
          </CardTitle>
          <CardDescription>
            {isCreate ? "Add a Category" : "Update a Category"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* NAME */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => (!value ? "Name is required" : undefined),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* DESCRIPTION */}
            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Description is required" : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* IMAGE */}
            <ImageUploader
              label="Category Image"
              images={categoryImages.images}
              onUpload={categoryImages.upload}
              onDelete={categoryImages.remove}
              multiple={false}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isCreate ? "Creating..." : "Updating..."
                : isCreate ? "Create Category" : "Update Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
