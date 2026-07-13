"use server"

import { api, getUrl } from '@/lib/utils';

export async function authorizeConnection() {
    try {
        const HOME_URL = process.env.HOME_URL!;
        const NODE_ENV = process.env.NODE_ENV!;

        // TODO: This is the bypass till home server is activated... make sure to remove this later.
        // if (NODE_ENV === "development") {
        const res = await api.post(getUrl("/auth/connect-home"));

        if (res.status !== 200) {
            throw new Error("Something went wrong!");
        }

        const redirectUrl = res.data.redirectUrl;
        return redirectUrl;
        // }

        const url = new URL("/auth/connect?app=the-port-mafia", HOME_URL).toString();

        return url;
    } catch (error) {
        throw error;
    }
}