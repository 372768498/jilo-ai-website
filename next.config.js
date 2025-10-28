/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/microsite/yoyicare',
        destination: '/microsite-yoyicare.html',
      },
      {
        source: '/microsite/shiningcrystal',
        destination: '/microsite-shiningcrystal.html',
      },
    ];
  },
}

module.exports = nextConfig

