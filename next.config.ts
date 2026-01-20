/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // ビルド時の型チェックとESLintをスキップ
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/gallery",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
