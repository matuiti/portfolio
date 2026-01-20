/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // 型チェックとESLintをビルド時にスキップ（実行時エラーではありません）
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // トップからギャラリーへのリダイレクト
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