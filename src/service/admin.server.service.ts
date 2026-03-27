import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const adminService = {
  // Get all users
  getAllUsers: () =>
    apiFetchServerMain("/admin/users", {
      method: "GET",
    }),
  getAllAdmins: () =>
    apiFetchServerMain("/admin/admins", {
      method: "GET",
    }),

  // Update user status
  updateUserStatus: (id: string, payload: { status: string }) =>
    apiFetchServerMain(`/admin/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  updateUserRole: (id: string, role: "USER" | "ADMIN") =>
    apiFetchServerMain(`/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  // Delete user
  deleteUser: (id: string) =>
    apiFetchServerMain(`/admin/users/${id}`, {
      method: "DELETE",
    }),

  // Get admin stats
  getStats: () =>
    apiFetchServerMain("/admin/stats", {
      method: "GET",
    }),
};