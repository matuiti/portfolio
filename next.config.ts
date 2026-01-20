import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gallery/", // ここに確認してほしいページのパスを入れる
        permanent: false, // 開発中の一時的な転送なのでfalse
      },
    ];
  },
};

export default nextConfig;
