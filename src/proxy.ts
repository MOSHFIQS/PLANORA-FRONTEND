import { NextRequest, NextResponse } from "next/server"
import { Roles } from "./constants/roles"
import { sessionService } from "./service/token.service";
export const dynamic = "force-dynamic"



export async function proxy(request: NextRequest) {
     const pathname = request.nextUrl.pathname;
     const data = await sessionService.getUserFromToken()

     console.log("data",data);


     const role = data?.role

     const isAdmin = role === Roles.admin 
     const isUser = role === Roles.user


 
     if (isAdmin && (pathname.startsWith("/dashboard"))) {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url))
     }


     if (isUser && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-dashboard"))) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }

     

     if(!role && (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/user-dashboard"))){
          return NextResponse.redirect(new URL("/", request.url))
     }


     return NextResponse.next()
}

export const config = {
     matcher: [
          "/admin-dashboard/:path*",
          // "/dashboard/:path*",
     ],
}
