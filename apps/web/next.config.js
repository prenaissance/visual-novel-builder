/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "visual-novel-builder"],
  images: {
    unoptimized: true,
  }
};
