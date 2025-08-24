/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Alias react-native to react-native-web
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };
    
    // Add extensions for React Native Web
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      '.js',
      '.ts',
      '.tsx',
    ];

    // Handle React Native Web specific modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-native-screens': false,
      'react-native-safe-area-context': false,
      'react-native-gesture-handler': false,
      'react-native-reanimated': false,
      'react-native-vector-icons': false,
      'react-native-linear-gradient': false,
    };

    // Exclude problematic React Native modules from web builds
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        'react-native-gesture-handler': 'react-native-gesture-handler',
        'react-native-reanimated': 'react-native-reanimated',
        'react-native-screens': 'react-native-screens',
        'react-native-safe-area-context': 'react-native-safe-area-context',
      });
    }

    return config;
  },
  // Transpile React Native modules
  transpilePackages: ['react-native', 'react-native-web'],
};

module.exports = nextConfig; 