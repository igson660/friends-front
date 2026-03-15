"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  ICredentials,
  IAuthResponse,
  IAuthContextData,
  IPersonAuth,
} from "@/shared/types/models/auth.model";

import { authRequest } from "@/service/auth.service";
import { tokenStorage } from "@/shared/utils/storage";

const AuthContext = createContext<IAuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<IPersonAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = tokenStorage.getAccess();
    const user = tokenStorage.getUser();

    if (token && user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (credentials: ICredentials) => {
    setLoading(true);

    const response: IAuthResponse = await authRequest(credentials);

    const { access, refresh, person } = response.data;

    tokenStorage.setAccess(access);
    tokenStorage.setRefresh(refresh);
    tokenStorage.setUser(person);

    setUser(person);
    setIsAuthenticated(true);

    setLoading(false);

    router.push("/dashboard");
  };

  const logout = () => {
    tokenStorage.clear();

    setUser(null);
    setIsAuthenticated(false);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
