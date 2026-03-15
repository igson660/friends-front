"use client";

import { parseCookies } from "nookies";
import wretch, { WretchOptions, WretchResponse } from "wretch";
import AbortAddon from "wretch/addons/abort";

import { IWretchMiddlewareOptions } from "@/shared/types/models/wretchMiddleware.model";

import {
  // DEV_API_URL,
  PROD_API_URL,
  SESSION_COOKIE_KEY,
} from "./constants";

const notAuthNeededEndpoints = [
  `${PROD_API_URL}/login/`,
  `${PROD_API_URL}/register/`,
];

const wretchMiddleware =
  () =>
  (
    next: (
      url: string,
      options: IWretchMiddlewareOptions
    ) => Promise<WretchResponse>
  ) =>
  (url: string, options: WretchOptions) => {
    const { [SESSION_COOKIE_KEY!]: token } = parseCookies();

    if (token && !notAuthNeededEndpoints.includes(url)) {
      options.headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
      };
    }

    return next(url, options);
  };

export const api = wretch(PROD_API_URL)
  .middlewares([wretchMiddleware()])
  .addon(AbortAddon());
