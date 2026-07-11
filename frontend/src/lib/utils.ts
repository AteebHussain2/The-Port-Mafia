import 'dotenv';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const SERVER_URL = process.env.SERVER_URL!;
const NEXT_PUBLIC_DEFAULT_REDIRECT_URL = process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL!;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrl(path: string) {
  const baseUrl = SERVER_URL ?? 'http://localhost:3810';
  return new URL("/api/v1" + path, baseUrl).toString();
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirectTo = searchParams.get("redirectTo");
  if (redirectTo) return redirectTo;

  const envUrl = NEXT_PUBLIC_DEFAULT_REDIRECT_URL;
  if (envUrl) return envUrl;

  return "/";
}

export const api = axios.create({
  baseURL: SERVER_URL ?? "http://localhost:3001",
  withCredentials: true,
});