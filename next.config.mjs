/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // TypeScriptのビルドエラーを無視する設定
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/gallery',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;