// "use server";

// import { adminService } from "@/service/server/admin.server.service";
// import { buildQueryString } from "@/utils/buildQueryString";
// import { revalidatePath } from "next/cache";

// // Get all users
// export async function getAllUsersAction(page?: number, limit?: number) {
//   try {
//     const query = buildQueryString({
//       page,
//       limit,
//     });
//     const res = await adminService.getAllUsers(query);

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to fetch Users",
//       };
//     }

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch {
//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }
// // Get all admins
// export async function getAllAdminsAction(page?: number, limit?: number) {
//   try {
//     const query = buildQueryString({
//       page,
//       limit,
//     });
//     const res = await adminService.getAllAdmins(query);

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to fetch Admins",
//       };
//     }

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch {
//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }

// //  Update user status
// export async function updateUserStatusAction(
//   id: string,
//   payload: { status: string }
// ) {
//   try {
//     const res = await adminService.updateUserStatus(id, payload);
//     revalidatePath("/admin-dashboard/users");
//     // console.log("res", res);

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to update user status",
//       };
//     }


//     return {
//       ok: true,
//       data: res.data,
//       message: res?.message || "User status updated",
//     };
//   } catch {

//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }


// export async function updateUserRoleAction(
//   id: string,
//   role: "USER" | "ADMIN"
// ) {
//   try {
//     const res = await adminService.updateUserRole(id, role);

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to update role",
//       };
//     }

//     // revalidate relevant pages
//     revalidatePath("/dashboard/users");
//     revalidatePath("/dashboard/admins");

//     return {
//       ok: true,
//       message: res.message || "User role updated successfully",
//       data: res.data,
//     };
//   } catch {
//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }

// // Delete user
// export async function deleteUserAction(id: string) {
//   try {
//     const res = await adminService.deleteUser(id);

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to delete user",
//       };
//     }

//     revalidatePath("/admin-dashboard/users");

//     return {
//       ok: true,
//       message: res?.message || "User deleted successfully",
//     };
//   } catch {
//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }

// //  Get admin stats
// export async function getAdminStatsAction() {
//   try {

//     const res = await adminService.getStats();

//     if (!res?.ok) {
//       return {
//         ok: false,
//         message: res?.message || "Failed to fetch stats",
//       };
//     }

//     return {
//       ok: true,
//       data: res.data,
//     };
//   } catch {
//     return {
//       ok: false,
//       message: "Something went wrong",
//     };
//   }
// }




"use server";

import { adminService } from "@/service/server/admin.server.service";
import { buildQueryString } from "@/utils/buildQueryString";
import { revalidatePath } from "next/cache";

// Get all users
export async function getAllUsersAction(page?: number, limit?: number) {
  try {
    const query = buildQueryString({ page, limit });
    const res = await adminService.getAllUsers(query);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to fetch users" };
    }

    return { ok: true, message: res?.message, data: res.data };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}

// Get single user
export async function getSingleUserAction(id: string) {
  try {
    if (!id) return { ok: false, message: "User ID is required", data: null };

    const res = await adminService.getSingleUser(id);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to fetch user" };
    }

    return { ok: true, message: res?.message, data: res.data };
  } catch {
    return { ok: false, message: "Something went wrong", data: null };
  }
}

// Get all admins
export async function getAllAdminsAction(page?: number, limit?: number) {
  try {
    const query = buildQueryString({ page, limit });
    const res = await adminService.getAllAdmins(query);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to fetch admins" };
    }

    return { ok: true, message: res?.message, data: res.data };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}

// Create admin
export async function createAdminAction(payload: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await adminService.createAdmin(payload);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to create admin" };
    }

    revalidatePath("/dashboard/admins");

    return { ok: true, message: res?.message || "Admin created successfully", data: res.data };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}

// Update user status
export async function updateUserStatusAction(
  id: string,
  payload: { status: string }
) {
  try {
    const res = await adminService.updateUserStatus(id, payload);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to update user status" };
    }

    revalidatePath("/admin-dashboard/users");

    return {
      ok: true,
      message: res?.message || "User status updated",
      data: res.data,
    };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}

// Update user role
export async function updateUserRoleAction(
  id: string,
  role: "USER" | "ADMIN" | "ORGANIZER"
) {
  try {
    const res = await adminService.updateUserRole(id, role);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to update role" };
    }

    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard/admins");

    return {
      ok: true,
      message: res?.message || "User role updated successfully",
      data: res.data,
    };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}

// Delete user
export async function deleteUserAction(id: string) {
  try {
    const res = await adminService.deleteUser(id);

    if (!res?.ok) {
      return { ok: false, message: res?.message || "Failed to delete user" };
    }

    revalidatePath("/admin-dashboard/users");

    return {
      ok: true,
      message: res?.message || "User deleted successfully",
    };
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
}