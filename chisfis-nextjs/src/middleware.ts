import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Alleen de oude admin-legacy route beveiligen, nieuwe admin is open
    if (req.nextUrl.pathname.startsWith("/admin-legacy")) {
        const auth = req.headers.get("authorization");
        const expected = "Basic " + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString("base64");
        if (auth !== expected) {
            return new NextResponse("Auth required", {
                status: 401,
                headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
            });
        }
    }
    return NextResponse.next();
}

export const config = { matcher: ["/admin-legacy/:path*"] };