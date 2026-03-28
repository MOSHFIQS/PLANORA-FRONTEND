import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const categoryService = {
  // get all categories (public)
  getAllCategories: () =>
    apiFetchServerMain("/category", {
      method: "GET",
    }),

  // get single category
  getSingleCategory: (id: string) =>
    apiFetchServerMain(`/category/${id}`, {
      method: "GET",
    }),

  // create category
  createCategory: (payload: any) =>
    apiFetchServerMain("/category", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // update category
  updateCategory: (id: string, payload: any) =>
    apiFetchServerMain(`/category/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  // delete category
  deleteCategory: (id: string) =>
    apiFetchServerMain(`/category/${id}`, {
      method: "DELETE",
    }),

};