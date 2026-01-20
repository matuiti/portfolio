// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(" ")[1];
      // atobを使ってデコード（Edge Runtimeで推奨される方法）
      const decoded = atob(authValue);
      const [user, pwd] = decoded.split(":");

      // 環境変数が存在することを確認してから比較
      const expectedUser = process.env.BASIC_AUTH_USER;
      const expectedPwd = process.env.BASIC_AUTH_PASSWORD;

      if (user === expectedUser && pwd === expectedPwd) {
        const response = NextResponse.next();
        response.headers.set("x-robots-tag", "noindex, nofollow");
        return response;
      }
    } catch {
      // デコード失敗などのエラー時は何もしない
    }
  }

  return new NextResponse("Auth Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
