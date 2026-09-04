/** @type {import('next').NextConfig} */
const nextConfig = {
  // /landing-page moved to root ("/") - these keep any existing bookmarks,
  // shared links, or indexed search results pointing at the old paths
  // working instead of 404ing.
  async redirects() {
    return [
      {
        source: "/landing-page",
        destination: "/",
        permanent: true,
      },
      {
        source: "/landing-page/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
