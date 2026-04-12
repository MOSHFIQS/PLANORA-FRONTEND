"use server";

import { revalidatePath } from "next/cache";
import { categoryService } from "@/service/server/category.server.service";

// GET ALL
export async function getAllCategoriesAction() {
  try {
    const res = await categoryService.getAllCategories();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch categories",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// GET SINGLE
export async function getSingleCategoryAction(id: string) {
  try {
    const res = await categoryService.getSingleCategory(id);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch category",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// CREATE
export async function createCategoryAction(payload: any) {
  try {
    const res = await categoryService.createCategory(payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Category creation failed",
      };
    }

    revalidatePath("/admin-dashboard/category");
    revalidatePath("/super-admin-dashboard/category");

    return {
      ok: true,
      message: res.message || "Category created successfully",
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// UPDATE
export async function updateCategoryAction(id: string, payload: any) {
  try {
    const res = await categoryService.updateCategory(id, payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Update failed",
      };
    }

    revalidatePath("/admin-dashboard/category");
    revalidatePath("/super-admin-dashboard/category");

    return {
      ok: true,
      message: res.message || "Category updated successfully",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// DELETE
export async function deleteCategoryAction(id: string) {
  try {
    const res = await categoryService.deleteCategory(id);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Delete failed",
      };
    }

    revalidatePath("/admin-dashboard/category");
    revalidatePath("/super-admin-dashboard/category");

    return {
      ok: true,
      message: res.message || "Category deleted successfully",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}