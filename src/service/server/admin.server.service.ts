// import { apiFetchServerMain } from "@/lib/apiFetchServer";

// export const adminService = {
//   // Get all users
//   getAllUsers: (query?: string) =>
//     apiFetchServerMain(`/admin/users?${query || ''}`, {
//       method: "GET",
//     }),
//   getAllAdmins: (query?: string) =>
//     apiFetchServerMain(`/admin/admins?${query || ''}`, {
//       method: "GET",
//     }),

//   // Update user status
//   updateUserStatus: (id: string, payload: { status: string }) =>
//     apiFetchServerMain(`/admin/users/${id}/status`, {
//       method: "PATCH",
//       body: JSON.stringify(payload),
//     }),

//   updateUserRole: (id: string, role: "USER" | "ADMIN") =>
//     apiFetchServerMain(`/admin/users/${id}/role`, {
//       method: "PATCH",
//       body: JSON.stringify({ role }),
//     }),

//   // Delete user
//   deleteUser: (id: string) =>
//     apiFetchServerMain(`/admin/users/${id}`, {
//       method: "DELETE",
//     }),

//   // Get admin stats
//   getStats: () =>
//     apiFetchServerMain("/admin/stats", {
//       method: "GET",
//     }),
// };




import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const adminService = {
  // Users
  getAllUsers: (query?: string) =>
    apiFetchServerMain(`/admin/users${query ? `?${query}` : ""}`, {
      method: "GET",
    }),

  getSingleUser: (id: string) =>
    apiFetchServerMain(`/admin/users/${id}`, {
      method: "GET",
    }),

  updateUserStatus: (id: string, payload: { status: string }) =>
    apiFetchServerMain(`/admin/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  updateUserRole: (id: string, role: "USER" | "ADMIN" | "ORGANIZER") =>
    apiFetchServerMain(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  deleteUser: (id: string) =>
    apiFetchServerMain(`/admin/users/${id}`, {
      method: "DELETE",
    }),

  // Admins
  getAllAdmins: (query?: string) =>
    apiFetchServerMain(`/admin/admins${query ? `?${query}` : ""}`, {
      method: "GET",
    }),

  createAdmin: (payload: { name: string; email: string; password: string }) =>
    apiFetchServerMain(`/admin/admins`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};