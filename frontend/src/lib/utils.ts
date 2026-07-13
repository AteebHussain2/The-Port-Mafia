import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrl(path: string) {
  const SERVER_URL = process.env.SERVER_URL!;

  return new URL("/api/v1" + path, SERVER_URL).toString();
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirectTo = searchParams.get("redirectTo");
  if (redirectTo) return redirectTo;

  const envUrl = process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL;
  if (envUrl) return envUrl;

  return "/";
}

export const api = axios.create({
  baseURL: process.env.SERVER_URL!,
  withCredentials: true,
});