"use client";

import {
     createContext,
     useContext,
     useState,
     ReactNode,
     useEffect,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user.types";

type AuthContextType = {
     user: User | null;
     accessToken: string | null;
     refreshToken: string | null;
     token: string | null;
     loading: boolean;

     setAuthData: (
          user: User,
          accessToken: string,
          refreshToken: string,
          token: string
     ) => void;

     logout: () => void;
};

type JwtPayload = {
     exp: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);
     const [accessToken, setAccessToken] = useState<string | null>(null);
     const [refreshToken, setRefreshToken] = useState<string | null>(null);
     const [token, setToken] = useState<string | null>(null);
     const [loading, setLoading] = useState(true);

     // prevent multiple refresh calls
     let isRefreshing = false;

     const safeDecode = (token: string): JwtPayload | null => {
          try {
               return jwtDecode<JwtPayload>(token);
          } catch {
               return null;
          }
     };

     const refreshAccessToken = async (): Promise<string | null> => {
          if (isRefreshing) return null;
          isRefreshing = true;

          try {
               const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
                    method: "POST",
                    credentials: "include",
               });

               if (!res.ok) return null;

               const data = await res.json();
               const { 
                    accessToken: newAccessToken, 
                    refreshToken: newRefreshToken, 
                    sessionToken: newSessionToken, // renamed from token
                    user: userData 
               } = data?.data || {};

               if (!newAccessToken || !newRefreshToken || !newSessionToken) return null;

               const decodedAccess = safeDecode(newAccessToken);
               const decodedRefresh = safeDecode(newRefreshToken);

               if (!decodedAccess || !decodedRefresh) return null;

               // Update state
               setAccessToken(newAccessToken);
               setRefreshToken(newRefreshToken);
               setToken(newSessionToken);
               if (userData) setUser(userData);

               const accessExpiry = new Date(decodedAccess.exp * 1000);
               const refreshExpiry = new Date(decodedRefresh.exp * 1000);

               // Update cookies
               Cookies.set("accessToken", newAccessToken, { expires: accessExpiry });
               Cookies.set("refreshToken", newRefreshToken, { expires: refreshExpiry });
               
               // Better-auth session token (7 days for improved persistence)
               Cookies.set("better-auth.session_token", newSessionToken, { expires: 7 });
               
               if (userData) {
                    Cookies.set("user", JSON.stringify(userData), { expires: 7 }); 
               }

               return newAccessToken;
          } catch (err) {
               console.error("Refresh token error:", err);
               return null;
          } finally {
               isRefreshing = false;
          }
     };

     useEffect(() => {
          const initAuth = async () => {
               const cookieAccessToken = Cookies.get("accessToken");
               const cookieRefreshToken = Cookies.get("refreshToken");
               const cookieUser = Cookies.get("user");
               const cookieSessionToken = Cookies.get("better-auth.session_token");

               if (cookieUser) setUser(JSON.parse(cookieUser));
               if (cookieSessionToken) setToken(cookieSessionToken);
               if (cookieRefreshToken) setRefreshToken(cookieRefreshToken);

               if (!cookieAccessToken) {
                    if (cookieRefreshToken) {
                         const newToken = await refreshAccessToken();
                         // Only logout if refresh actually fails
                         if (!newToken) logout();
                    }
               } else {
                    const decoded = safeDecode(cookieAccessToken);
                    if (!decoded || decoded.exp * 1000 < Date.now()) {
                         if (cookieRefreshToken) await refreshAccessToken();
                    } else {
                         setAccessToken(cookieAccessToken);
                    }
               }

               setLoading(false);
          };

          initAuth();
     }, []);

     useEffect(() => {
          if (!accessToken) return;

          const decoded = safeDecode(accessToken);
          if (!decoded) {
               refreshAccessToken();
               return;
          }

          const expiryTime = decoded.exp * 1000 - Date.now();

          if (expiryTime <= 0) {
               refreshAccessToken();
               return;
          }

          const refreshTime = Math.max(expiryTime - 300 * 1000, 0);

          const timer = setTimeout(() => {
               refreshAccessToken();
          }, refreshTime);

          return () => clearTimeout(timer);
     }, [accessToken]);

     const setAuthData = (
          userData: User,
          access: string,
          refresh: string,
          sessionTokenValue: string // renamed from tokenValue
     ) => {
          try {
               const accessDecoded = safeDecode(access);
               const refreshDecoded = safeDecode(refresh);

               if (!accessDecoded || !refreshDecoded) {
                    logout();
                    return;
               }

               setAccessToken(access);
               setRefreshToken(refresh);
               setToken(sessionTokenValue);
               setUser(userData);

               const accessExpiry = new Date(accessDecoded.exp * 1000);
               const refreshExpiry = new Date(refreshDecoded.exp * 1000);

               Cookies.set("accessToken", access, {
                    expires: accessExpiry
               });

               Cookies.set("refreshToken", refresh, {
                    expires: refreshExpiry
               });

               // Match user cookie persistence (7 days) for session token
               Cookies.set("better-auth.session_token", sessionTokenValue, {
                    expires: 7
               });

               Cookies.set("user", JSON.stringify(userData), {
                    expires: 7,
               });
          } catch {
               logout();
          }
     };

     const logout = () => {
          
          setUser(null);
          setAccessToken(null);
          setRefreshToken(null);
          setToken(null);

          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("better-auth.session_token");
          Cookies.remove("user");
     };

     return (
          <AuthContext.Provider
               value={{
                    user,
                    accessToken,
                    refreshToken,
                    token,
                    loading,
                    setAuthData,
                    logout,
               }}
          >
               {children}
          </AuthContext.Provider>
     );
};

export const useAuth = (): AuthContextType => {
     const context = useContext(AuthContext);
     if (!context)
          throw new Error("useAuth must be used within AuthProvider");
     return context;
};