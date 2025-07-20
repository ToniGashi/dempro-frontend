"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContextType, LimitedUserProfile } from "@/lib/types";
import { getCookie } from "@/lib/utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: LimitedUserProfile | null;
}) {
  const [user, setUser] = useState<LimitedUserProfile | null>(userData);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setUser(null);
      router.replace("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    try {
      const userCookie = getCookie("user");
      if (userCookie) {
        setUser(JSON.parse(userCookie));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // Check if user was redirected due to session expiry
      if (searchParams?.get("expired") === "true") {
        setUser(null);
      } else {
        await refreshUser();
      }
      setIsLoading(false);
    };

    initAuth();
  }, [searchParams]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
