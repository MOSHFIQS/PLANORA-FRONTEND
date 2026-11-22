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
               let payload: TokenPayload | null = null
               if (secret) {
                    payload = jwt.verify(token, secret) as TokenPayload
               } else {
                    payload = jwt.decode(token) as TokenPayload
               }
               if (payload && payload.exp && payload.exp * 1000 < Date.now()) {
                    return null
               }
               return payload
          } catch {
               return null
          }
     },
}
