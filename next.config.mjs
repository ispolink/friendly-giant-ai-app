/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['react-tweet'],
    compiler: {
        emotion: true, // Enable Emotion support in SWC
    },
    webpack(config) {
    // Exclude SVGs from default Next.js handling
    config.module.rules = config.module.rules.map(rule => {
      if (rule.test?.toString().includes('svg')) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
