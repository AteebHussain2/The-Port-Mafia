import { api, getUrl } from '@/lib/utils';
import 'dotenv';
import { redirect } from "next/navigation";

const HOME_URL = process.env.HOME_URL!;
const NODE_ENV = process.env.NODE_ENV!;

export const initiateLinkedInAuth = () => {
    const rootUrl = "https://www.linkedin.com/oauth/v2/authorization";
    const client_id = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;

    if (!client_id) {
        throw new Error("Something went wrong!")
    }

    const options = {
        response_type: "code",
        client_id,
        redirect_uri: "http://localhost:3810/api/auth/callback",
        state: "random_secure_string_or_csrf_token",
        scope: "openid profile w_member_social r_profile_basicinfo",
    };

    const qs = new URLSearchParams(options).toString();

    redirect(`${rootUrl}?${qs}`);
};

export async function authorizeConnection() {
    try {
        if (NODE_ENV === "development") {
            const res = await api.post(getUrl("/auth/connect-home"));

            if (res.status !== 200) {
                throw new Error("Something went wrong!");
            }

            const redirectUrl = res.data.redirectUrl;
            return redirect(redirectUrl);
        }

        const url = new URL("/auth/connect?app=the-port-mafia", HOME_URL).toString();

        return redirect(url);
    } catch (error) {
        console.error("Something went wrong! Error: ", error);
    }
}