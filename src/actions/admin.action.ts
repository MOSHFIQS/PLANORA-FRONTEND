"use server";

import { adminService } from "@/service/admin.server.service";
import { revalidatePath } from "next/cache";

// Get all users
export async function getAllUsersAction() {
  try {
    const res = await adminService.getAllUsers();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch Users",
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
// Get all admins
export async function getAllAdminsAction() {
  try {
    const res = await adminService.getAllAdmins();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch Admins",
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

//  Update user status
export async function updateUserStatusAction(
  id: string,
  payload: { status: string }
) {
  try {
    const res = await adminService.updateUserStatus(id, payload);
    revalidatePath("/admin-dashboard/users");
    console.log("res", res);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to update user status",
      };
    }


    return {
      ok: true,
      data: res.data,
      message: res?.message || "User status updated",
    };
  } catch {

    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}


export async function updateUserRoleAction(
  id: string,
  role: "USER" | "ADMIN"
) {
  try {
    const res = await adminService.updateUserRole(id, role);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to update role",
      };
    }

    // revalidate relevant pages
    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard/admins");

    return {
      ok: true,
      message: res.message || "User role updated successfully",
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

// Delete user
export async function deleteUserAction(id: string) {
  try {
    const res = await adminService.deleteUser(id);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to delete user",
      };
    }

    revalidatePath("/admin-dashboard/users");

    return {
      ok: true,
      message: res?.message || "User deleted successfully",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

//  Get admin stats
export async function getAdminStatsAction() {
  try {
    const res = await adminService.getStats();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch stats",
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