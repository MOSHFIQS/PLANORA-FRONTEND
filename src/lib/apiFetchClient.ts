import Cookies from "js-cookie";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetchClient(endpoint: string, options?: RequestInit) {
  try {
    const token = Cookies.get("accessToken");

    const isFormData = options?.body instanceof FormData;

    const headers: HeadersInit = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
      credentials: "include",
      ...options,
      headers,
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = {};
    }
    // console.log(data);

    return {
      ok: res.ok,
      status: res.status,
      data: data.data || null,
      message: data?.message || (res.ok ? "Success" : "API request failed"),
    };
  } catch (error: any) {
    console.error("apiFetchClient error:", error);

    return {
      ok: false,
      status: 0,
      data: null,
      message: error.message || "Network error",
    };
  }
}