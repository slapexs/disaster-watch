import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	return NextResponse.redirect(new URL("/earthquake", request.url));
}

export const config = {
	matcher: ["/((?!earthquake|api|_next/static|_next/image|favicon.ico).*)"],
};

