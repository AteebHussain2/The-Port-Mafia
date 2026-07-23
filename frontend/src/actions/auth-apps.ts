"use server"

import { redirect } from "next/navigation";
import { getUrl } from "@/lib/utils";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const initiateLinkedInAuth = async () => {
    const cookieStore = await cookies();

    const rootUrl = "https://www.linkedin.com/oauth/v2/authorization";
    const client_id = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;

    if (!client_id) {
        throw new Error("Something went wrong!")
    }

    const redirectUri = encodeURIComponent(getUrl("/linkedin/callback", "frontend"));
    const scope = "openid profile email";
    const state = randomUUID();

    cookieStore.set({
        name: "state",
        value: state,
        maxAge: 5 * 60,
        sameSite: 'lax',
        httpOnly: true,
        secure: true,
    })

    const authUrl = `${rootUrl}?response_type=code&client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    redirect(authUrl);
};