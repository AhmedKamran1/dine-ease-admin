/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/login',
        basePath: false,
        permanent: false,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`,
    ],
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
