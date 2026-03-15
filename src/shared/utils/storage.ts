import {
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_KEY_REFRESH,
  SESSION_COOKIE_KEY_USER,
} from "@/config/constants";
import { IPersonAuth } from "../types/models/auth.model";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }

  return null;
};

export const tokenStorage = {
  getAccess: () => getCookie(SESSION_COOKIE_KEY as string),

  getRefresh: () => getCookie(SESSION_COOKIE_KEY_REFRESH as string),

  getUser: () => getCookie(SESSION_COOKIE_KEY_USER as string),

  setAccess: (token: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_KEY}=${token}; path=/; SameSite=Lax`;
  },

  setRefresh: (token: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_KEY_REFRESH}=${token}; path=/; SameSite=Lax`;
  },

  setUser: (person: IPersonAuth) => {
    if (typeof document === "undefined") return;
    document.cookie = `${SESSION_COOKIE_KEY_USER}=${JSON.stringify(person)}; path=/; SameSite=Lax`;
  },

  clear: () => {
    if (typeof document === "undefined") return;

    document.cookie = `${SESSION_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${SESSION_COOKIE_KEY_REFRESH}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${SESSION_COOKIE_KEY_USER}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};
