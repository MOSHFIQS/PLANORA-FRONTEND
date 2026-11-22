import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { TokenPayload } from "@/types/token.types"

export const sessionService = {
     getUserFromToken: async (): Promise<TokenPayload | null> => {
          const cookieStore = await cookies()
          const token = cookieStore.get("refreshToken")?.value

          if (!token) return null

          try {
               const secret = process.env.REFRESH_TOKEN_SECRET
               if (secret) {
                    return jwt.verify(token, secret) as TokenPayload
               }
               return jwt.decode(token) as TokenPayload
          } catch {
               return null
          }
     },
}
