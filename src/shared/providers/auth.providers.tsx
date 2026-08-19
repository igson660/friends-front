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

// 30 minutos em milissegundos.
const SESSION_TIMEOUT = 30 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<IPersonAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = tokenStorage.getAccess();
    const storedUser = tokenStorage.getUser();

    if (token && storedUser) {
      try {
        // storedUser é string | null; a validação acima garante que é string aqui.
        const parsedUser = JSON.parse(storedUser) as IPersonAuth;

        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        // Remove uma sessão caso o usuário armazenado esteja inválido.
        tokenStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    setLoading(false);
  }, []);

  // Expira a sessão após 30 minutos e redireciona para o login.
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      tokenStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/login");
    }, SESSION_TIMEOUT);

    // Cancela o timer anterior quando o usuário sair ou o componente desmontar.
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, router]);

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
