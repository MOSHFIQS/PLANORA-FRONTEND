import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { sessionService } from "./service/server/token.service";

export const dynamic = "force-dynamic";

export async function proxy(request: NextRequest) {
     const pathname = request.nextUrl.pathname;

     const data = await sessionService.getUserFromToken();
     const role = data?.role;

     const isAdmin = role === Roles.admin;
     const isUser = role === Roles.user;
     const isOrganizer = role === Roles.organizer;
     const isSuperAdmin = role === Roles.superAdmin;

     // If user is already logged in, redirect from login/register
     if (role && (pathname === "/login" || pathname === "/register")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
     }

     // Force password change redirect
     if (data?.needPasswordChange && pathname !== "/change-password") {
          return NextResponse.redirect(new URL("/change-password", request.url));
     }

     // Block /change-password for Google-only users & anyone who doesn't need forced password change
     // Google users always have needPasswordChange = false, so this naturally blocks them.
     // It also prevents any authenticated user from manually navigating here without being force-redirected.
     if (pathname === "/change-password") {
          if (!role) {
               // Unauthenticated — send to login
               return NextResponse.redirect(new URL("/login", request.url));
          }
          if (!data?.needPasswordChange) {
               // User doesn't need to change password (includes all Google-registered users)
               const dashboardMap: Record<string, string> = {
                    ADMIN: "/admin-dashboard",
                    ORGANIZER: "/organizer-dashboard",
                    SUPERADMIN: "/super-admin-dashboard",
               };
               const dest = dashboardMap[role] ?? "/dashboard";
               return NextResponse.redirect(new URL(dest, request.url));
          }
     }

     // Admin restrictions
     if (
          isAdmin &&
          (
               pathname.startsWith("/dashboard") ||
               pathname.startsWith("/organizer-dashboard") ||
               pathname.startsWith("/super-admin-dashboard")
          )
     ) {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
     }

     // User restrictions
     if (
          isUser &&
          (
               pathname.startsWith("/admin-dashboard") ||
               pathname.startsWith("/organizer-dashboard") ||
               pathname.startsWith("/super-admin-dashboard")
          )
     ) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
     }

     // Organizer restrictions
     if (
          isOrganizer &&
          (
               pathname.startsWith("/admin-dashboard") ||
               pathname.startsWith("/dashboard") ||
               pathname.startsWith("/super-admin-dashboard")
          )
     ) {
          return NextResponse.redirect(new URL("/organizer-dashboard", request.url));
     }

     // Super Admin restrictions
     if (
          isSuperAdmin &&
          (
               pathname.startsWith("/admin-dashboard") ||
               pathname.startsWith("/dashboard") ||
               pathname.startsWith("/organizer-dashboard")
          )
     ) {
          return NextResponse.redirect(new URL("/super-admin-dashboard", request.url));
     }

     // Unauthenticated user
     if (
          !role &&
          (
               pathname.startsWith("/admin-dashboard") ||
               pathname.startsWith("/dashboard") ||
               pathname.startsWith("/organizer-dashboard") ||
               pathname.startsWith("/super-admin-dashboard")
          )
     ) {
          return NextResponse.redirect(new URL("/", request.url));
     }

     return NextResponse.next();
}

export const config = {
     matcher: [
          "/admin-dashboard/:path*",
          "/dashboard/:path*",
          "/organizer-dashboard/:path*",
          "/super-admin-dashboard/:path*",
          "/login",
          "/register",
          "/change-password",
     ],
};