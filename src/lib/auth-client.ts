import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [polarClient()],
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    checkout,
    customer
} = authClient;