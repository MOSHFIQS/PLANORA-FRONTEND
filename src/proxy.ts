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

     // Admin trying to access user dashboard
     if (isAdmin && pathname.startsWith("/dashboard")) {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
     }

     //  User trying to access admin dashboard
     if (isUser && pathname.startsWith("/admin-dashboard")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
     }

     //  Unauthenticated user
     if (
          !role &&
          (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/dashboard"))
     ) {
          return NextResponse.redirect(new URL("/", request.url));
     }

     return NextResponse.next();
}
export const config = {
     matcher: [
          "/admin-dashboard/:path*",
          "/dashboard/:path*",
     ],
}