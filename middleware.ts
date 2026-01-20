import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(authValue, "base64").toString().split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      const response = NextResponse.next();
      // 検索エンジンを完全に拒否するヘッダーを追加
      response.headers.set("x-robots-tag", "noindex, nofollow");
      return response;
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
  // 全パスに適用（静的ファイル、UIギャラリーページ含む）
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
