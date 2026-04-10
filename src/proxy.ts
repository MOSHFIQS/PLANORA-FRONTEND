import { NextRequest, NextResponse } from "next/server"
import { Roles } from "./constants/roles"
import { sessionService } from "./service/server/token.service";
export const dynamic = "force-dynamic"



export async function proxy(request: NextRequest) {
     const pathname = request.nextUrl.pathname;

     const data = await sessionService.getUserFromToken();

     const role = data?.role;

     const isAdmin = role === Roles.admin;
     const isUser = role === Roles.user;
     const isOrganizer = role === Roles.organizer;
     const isSuperAdmin = role === Roles.superAdmin;

     // If user is already logged in, redirect from login/register page
     if (role && (pathname === "/login" || pathname === "/register")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
     }

     // Admin trying to access user dashboard
     if (isAdmin && pathname.startsWith("/dashboard") || pathname.startsWith("/organizer-dashboard") || pathname.startsWith("/super-admin-dashboard")) {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
     }

     //  User trying to access admin dashboard
     if (isUser && pathname.startsWith("/admin-dashboard") || pathname.startsWith("/organizer-dashboard") || pathname.startsWith("/super-admin-dashboard")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
     }

     //  Organizer trying to access admin dashboard
     if (isOrganizer && pathname.startsWith("/admin-dashboard") || pathname.startsWith("/dashboard") || pathname.startsWith("/super-admin-dashboard")) {
          return NextResponse.redirect(new URL("/organizer-dashboard", request.url));
     }

     //  Super Admin trying to access admin dashboard
     if (isSuperAdmin && pathname.startsWith("/admin-dashboard") || pathname.startsWith("/dashboard") || pathname.startsWith("/organizer-dashboard")) {
          return NextResponse.redirect(new URL("/super-admin-dashboard", request.url));
     }

     //  Unauthenticated user
     if (
          !role &&
          (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/dashboard") || pathname.startsWith("/organizer-dashboard") || pathname.startsWith("/super-admin-dashboard"))
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
     ],
}