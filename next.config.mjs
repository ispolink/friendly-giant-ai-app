/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['react-tweet'],
    compiler: {
        emotion: true, // Enable Emotion support in SWC
    }
};

export default nextConfig;
