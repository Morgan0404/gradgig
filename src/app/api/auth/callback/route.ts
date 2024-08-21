import { handleAuth } from '@workos-inc/authkit-nextjs';

export const GET = async (req: Request) => {
    try {
        return await handleAuth()(req);
    } catch (error) {
        console.error("Authentication Callback Error:", error);
        return new Response(JSON.stringify({ error: "Authentication failed" }), { status: 500 });
    }
};
