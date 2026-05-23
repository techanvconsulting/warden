// const withPWA = require('@ducanh2912/next-pwa').default({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
//   buildExcludes: [/middleware-manifest.json$/],
//   maximumFileSizeToCacheInBytes: 4000000,
//   workboxOptions: {
//     mode: 'production',
//   },
// })

const DuplicatePackageCheckerPlugin = require('@cerner/duplicate-package-checker-webpack-plugin')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const path = require('path')
const sassUtils = require(__dirname + '/libs/sass-utils')
const sassVars = require(__dirname + '/config/variables.js')

const nextConfig = {
  // Static HTML export for GitHub Pages (outputs to ./out)
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['@studio-freight/compono'],
  experimental: {
    optimizeCss: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  images: {
    // ADD in case you need to import SVGs in next/image component
    dangerouslyAllowSVG: true,
    // Static export has no Image Optimization server
    unoptimized: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.studiofreight.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    // add @import 'styles/_functions'; to all scss files.
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'styles/_functions';`,
    functions: {
      'get($keys)': function (keys) {
        keys = keys.getValue().split('.')
        let result = sassVars
        for (let i = 0; i < keys.length; i++) {
          result = result[keys[i]]
        }
        result = sassUtils.castToSass(result)

        return result
      },
      'getColors()': function () {
        return sassUtils.castToSass(sassVars.colors)
      },
      'getThemes()': function () {
        return sassUtils.castToSass(sassVars.themes)
      },
    },
  },
  webpack: (config, options) => {
    const { dir } = options

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              memo: true,
              dimensions: false,
              svgoConfig: {
                multipass: true,
                plugins: [
                  'removeDimensions',
                  'removeOffCanvasPaths',
                  'reusePaths',
                  'removeElementsByAttr',
                  'removeStyleElement',
                  'removeScriptElement',
                  'prefixIds',
                  'cleanupIds',
                  {
                    name: 'cleanupNumericValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertPathData',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'convertTransform',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                  {
                    name: 'cleanupListOfValues',
                    params: {
                      floatPrecision: 1,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      },
    )

    config.plugins.push(
      new DuplicatePackageCheckerPlugin({
        verbose: true,
        emitError: true,
        showHelp: true,
        strict: false,
        exclude: (instance) => instance.name === 'fbjs',
        alwaysEmitErrorsFor: ['react', 'react-router'],
      }),
    )

    return config
  },
  // NOTE: headers / redirects / rewrites are not supported with `output: 'export'`
  // (GitHub Pages is a static host). Configure those at the CDN/host layer if needed.
}

module.exports = withBundleAnalyzer(nextConfig)
