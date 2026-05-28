/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/nosotros',
        destination: '/es/nosotros',
        permanent: true,
      },
      {
        source: '/programas',
        destination: '/es/programas',
        permanent: true,
      },
      {
        source: '/historias',
        destination: '/es/historias',
        permanent: true,
      },
      {
        source: '/historias/:id',
        destination: '/es/historias/:id',
        permanent: true,
      },
      {
        source: '/donar',
        destination: '/es/donar',
        permanent: true,
      },
      {
        source: '/contacto',
        destination: '/es/contacto',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
