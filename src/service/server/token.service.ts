import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { TokenPayload } from "@/types/token.types"

export const sessionService = {
     getUserFromToken: async (): Promise<TokenPayload | null> => {
          const cookieStore = await cookies()
          const token = cookieStore.get("refreshToken")?.value

          if (!token) return null

          try {
               const payload = jwt.decode(token) as TokenPayload | null
               if (payload?.exp && payload.exp * 1000 < Date.now()) {
                    return null
               }
               return payload
          } catch {
               return null
          }
     },
}
