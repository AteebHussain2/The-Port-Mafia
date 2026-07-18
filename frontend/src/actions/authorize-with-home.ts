"use server";

import { cookies } from 'next/headers';
import { getUrl } from '@/lib/utils';
import { api } from '@/lib/api';

const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL!;

type Return = {
    success: boolean,
    message: string,
    details?: string,
    redirectUrl?: string
}

export async function authorizeConnection(): Promise<Return> {
    try {
        const cookieStore = await cookies();

        // TODO: This is the bypass till home server is activated... make sure to remove this later.
        // This will originally redirect user to home from where user is redirected to this url
        // a pid will be taken from the url... if there's an error message then that is displayed instead.
        // getting pid, a request is made to server which communicates with the home server to get user credentials
        // after verification, server returns a response with cookies set for jwt
        const res = await api.post(getUrl("/auth/connect-home"));
        console.log("@@RES: ", res)

        if (res.status !== 200)
            return { success: false, message: res.data.message, details: res.data.details }

        cookieStore.set({
            name: "auth",
            value: res.data.auth,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60,
            path: "/",
        });

        cookieStore.set({
            name: "refresh",
            value: res.data.refreshToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });

        return { success: true, message: res.data.message, redirectUrl: res.data.redirectUrl };

        // const url = new URL("/auth/connect?app=the-port-mafia", HOME_URL).toString();
        // return url;
    } catch (error) {
        console.log(error)
        return { success: false, message: "Something went wrong!", details: error instanceof Error ? error.message : "Unexpected Error" }
    }
}