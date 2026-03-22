
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { TokenPayload } from "@/types/token.types"

export const sessionService = {
     getUserFromToken: async (): Promise<TokenPayload | null> => {
          const cookieStore = await cookies()
          const token = cookieStore.get("accessToken")?.value

          if (!token) return null

          try {
               return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload
          } catch (err){
               // console.log("JWT invalid or expired:", err);
               return null
          }
     },
}