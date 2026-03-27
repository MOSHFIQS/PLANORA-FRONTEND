import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const bannerService = {
     // get all banners
     getAllBanners: () =>
          apiFetchServerMain("/banner", {
               method: "GET",
          }),

     getById: (id: string) => apiFetchServerMain(`/banner/${id}`),

     // get active banners (for homepage)
     getActiveBanners: () =>
          apiFetchServerMain("/banner/active", {
               method: "GET",
          }),

     // create banner
     createBanner: (payload: any) =>
          apiFetchServerMain("/banner", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     // update banner
     updateBanner: (id: string, payload: any) =>
          apiFetchServerMain(`/banner/${id}`, {
               method: "PATCH",
               body: JSON.stringify(payload),
          }),

     // delete banner
     deleteBanner: (id: string) =>
          apiFetchServerMain(`/banner/${id}`, {
               method: "DELETE",
          }),
};