import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();
  // 常に検索エンジンを拒否するヘッダーを注入
  response.headers.set("x-robots-tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
