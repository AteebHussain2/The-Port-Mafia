"use server"

import { getUrl } from '@/lib/utils';
import { api } from "@/lib/api";

type ExchangeResult = {
    success: boolean;
    message: string;
    redirectUrl: string;
};

/**
 * Trades the one-time LinkedIn authorization code for a live connection.
 * Always resolves — never throws — so the caller only has to branch on
 * `success`, matching the pattern in actions/authorize-with-home.ts.
 */
export async function exchangeLinkedInCode(code: string): Promise<ExchangeResult> {
    try {
        const redirect_uri = getUrl("/linkedin/callback", "frontend");

        const res = await api.post(getUrl("/linkedin/auth/exchange"), { code, redirect_uri });

        if (res.status !== 200) {
            return {
                success: false,
                message: res.data?.message ?? "LinkedIn didn't confirm the connection.",
                redirectUrl: "",
            };
        }

        return {
            success: true,
            message: "",
            redirectUrl: res.data?.redirectUrl ?? "/linkedin",
        };
    } catch (error) {
        return {
            success: false,
            message: "An unexpected error occurred!",
            redirectUrl: "",
        };
    }
}