/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // TypeScriptのビルドエラーを無視する設定
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;