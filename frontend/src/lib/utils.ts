import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;
const REDIRECT_URL = process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL!;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrl(path: string) {
  return new URL("/api/v1" + path, SERVER_URL).toString();
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirectTo = searchParams.get("redirectTo");
  if (redirectTo) return redirectTo;

  const envUrl = REDIRECT_URL;
  if (envUrl) return envUrl;

  return "/";
}

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});