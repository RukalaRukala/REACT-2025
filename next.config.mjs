/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',

  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;
