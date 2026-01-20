import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    try {
      const authValue = basicAuth.split(" ")[1];
      const decoded = atob(authValue);
      const [user, pwd] = decoded.split(":");

      // 型エラー回避のため、環境変数が undefined の場合は空文字を代入
      const expectedUser = process.env.BASIC_AUTH_USER ?? "";
      const expectedPwd = process.env.BASIC_AUTH_PASSWORD ?? "";

      // 両方の値が設定されており、かつ一致する場合のみ通過
      if (
        expectedUser !== "" &&
        expectedPwd !== "" &&
        user === expectedUser &&
        pwd === expectedPwd
      ) {
        const response = NextResponse.next();
        response.headers.set("x-robots-tag", "noindex, nofollow");
        return response;
      }
    } catch {
      // デコード失敗時はエラーを投げず、下の 401 を返す
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
