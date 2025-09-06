/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image loader settings
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['picsum.photos', 'placehold.it'],
    },
    transpilePackages: ['next-image-export-optimizer'],

    // Image export optimizer settings
    env: {
        nextImageExportOptimizer_imageFolderPath: 'public/enhanced-images',
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: '75',
        nextImageExportOptimizer_storePicturesInWEBP: 'true',
        nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',

        // If you do not want to use blurry placeholder images, then you can set
        // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
        // `placeholder="empty"` to all <ExportedImage> components.
        nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    },

    // React Strict Mode is a development-only feature that helps identify potential problems
    // It enables additional checks and warnings for:
    // - Identifying unsafe lifecycles
    // - Warning about legacy string ref API usage
    // - Detecting unexpected side effects
    // - Ensuring reusable state
    // - Detecting legacy context API
    reactStrictMode: true,

    // Ensure trailing slashes are added to all routes
    trailingSlash: false,

    // Styled Components settings
    compiler: {
        // styledComponents: true,
        removeConsole: process.env.NODE_ENV === 'production',

        styledComponents: {
            displayName: process.env.NODE_ENV === 'development',
            ssr: true,
            minify: true,
        },
    },

    // Headers configuration
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
