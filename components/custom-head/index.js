import { generateNextSeo } from 'next-seo/pages'
import NextHead from 'next/head'

// next-seo 7 removed the <NextSeo> component for the pages router; it now exposes
// generateNextSeo(props) which returns the SEO meta nodes to drop into <Head>.

const SITE_URL = 'https://warden.techanv.com'
const SITE_NAME = 'Warden'
const ORG_NAME = 'Techanv Consulting'

export function CustomHead({
  title,
  description,
  image,
  keywords,
  twitter = { handle: '@techanv' },
}) {
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/og.png`

  // Organization + WebSite + SoftwareApplication structured data (rich results
  // + entity understanding for classic and AI search).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: ORG_NAME,
        url: 'https://techanv.com',
        logo: `${SITE_URL}/android-chrome-512x512.png`,
        sameAs: [
          'https://github.com/techanvconsulting',
          'https://github.com/openarmor',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description,
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: SITE_NAME,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Linux, macOS, Windows',
        description,
        url: `${SITE_URL}/`,
        image: ogImage,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <NextHead>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <meta name="author" content={ORG_NAME} />
      <meta name="theme-color" content="#080808" />
      <meta name="color-scheme" content="dark" />
      <meta name="format-detection" content="telephone=no" />
      <meta
        name="keywords"
        content={keywords && keywords.length ? keywords.join(',') : keywords}
      />

      {/* START FAVICON */}
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      {/* END FAVICON */}

      {generateNextSeo({
        title,
        description,
        canonical: `${SITE_URL}/`,
        // index,follow + modern crawler directives (rich previews / full snippets)
        robotsProps: {
          maxSnippet: -1,
          maxImagePreview: 'large',
          maxVideoPreview: -1,
        },
        openGraph: {
          type: 'website',
          locale: 'en_US',
          url: `${SITE_URL}/`,
          siteName: SITE_NAME,
          title,
          description,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
              type: 'image/png',
            },
          ],
        },
        twitter: {
          handle: twitter.handle,
          site: twitter.handle,
          cardType: 'summary_large_image',
        },
      })}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </NextHead>
  )
}
