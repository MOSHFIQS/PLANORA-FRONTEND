"use server";

import { revalidatePath } from "next/cache";
import { bannerService } from "@/service/banner.server.service";

// GET ALL
export async function getAllBannersAction() {
     try {
          const res = await bannerService.getAllBanners();

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to fetch banners",
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


// GET ACTIVE
export async function getActiveBannersAction() {
     try {
          const res = await bannerService.getActiveBanners();

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to fetch active banners",
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

export async function getBannerByIdAction(id: string) {
     try {
          const res = await bannerService.getById(id);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to fetch banner",
                    data: null,
               };
          }

          return {
               ok: true,
               message: res?.message || "Banner fetched successfully",
               data: res?.data || null,
          };
     } catch (err: any) {
          return {
               ok: false,
               message: err?.message || "Something went wrong",
               data: null,
          };
     }
}

// CREATE
export async function createBannerAction(payload: any) {
     try {
          const res = await bannerService.createBanner(payload);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Banner creation failed",
               };
          }

          revalidatePath("/dashboard/banner");

          return {
               ok: true,
               message: res.message || "Banner created successfully",
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
export async function updateBannerAction(id: string, payload: any) {
     try {
          const res = await bannerService.updateBanner(id, payload);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Update failed",
               };
          }

          revalidatePath("/dashboard/banner");

          return {
               ok: true,
               message: res.message || "Banner updated successfully",
          };
     } catch {
          return {
               ok: false,
               message: "Something went wrong",
          };
     }
}

// DELETE
export async function deleteBannerAction(id: string) {
     try {
          const res = await bannerService.deleteBanner(id);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Delete failed",
               };
          }

          revalidatePath("/dashboard/banner");

          return {
               ok: true,
               message: res.message || "Banner deleted successfully",
          };
     } catch {
          return {
               ok: false,
               message: "Something went wrong",
          };
     }
}

export async function updateBannerStatusAction(
     id: string,
     isActive: boolean
) {
     try {
          const res = await bannerService.updateBannerStatus(id, isActive);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to update banner status",
               };
          }

          // revalidate dashboard + homepage (important)
          revalidatePath("/dashboard/banner");
          revalidatePath("/"); // homepage banners

          return {
               ok: true,
               message: res.message || "Banner status updated successfully",
               data: res.data,
          };
     } catch {
          return {
               ok: false,
               message: "Something went wrong",
          };
     }
}