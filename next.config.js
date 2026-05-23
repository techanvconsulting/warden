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
    includePaths: [__dirname, path.join(__dirname, 'styles')],
    // Prepend with an ABSOLUTE path so it resolves from anywhere — including
    // transpiled node_modules scss (compono). Next 16's webpack sass-loader
    // resolves bare paths relative to each file's dir, which breaks for
    // node_modules files; an absolute path sidesteps load-path resolution.
    prependData: `@import '${path
      .join(__dirname, 'styles', '_functions')
      .replace(/\\/g, '/')}';`,
    functions: {
      // Modern dart-sass API (Next 16): args arrive as an array of `Value`
      // objects and the function returns a `Value`.
      'get($keys)': function (args) {
        const keys = args[0].assertString('keys').text.split('.')
        let result = sassVars
        for (let i = 0; i < keys.length; i++) {
          result = result[keys[i]]
        }

        return sassUtils.castToSass(result)
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

    // NOTE: @cerner/duplicate-package-checker-webpack-plugin is unmaintained and
    // throws "Invalid version" on the modern dep tree (semver gets undefined).
    // Disabled during the bleeding-edge upgrade; re-add a maintained equivalent
    // if duplicate detection is needed.
    // config.plugins.push(new DuplicatePackageCheckerPlugin({ ... }))

    return config
  },
  // NOTE: headers / redirects / rewrites are not supported with `output: 'export'`
  // (GitHub Pages is a static host). Configure those at the CDN/host layer if needed.
}

module.exports = withBundleAnalyzer(nextConfig)
