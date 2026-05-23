import { generateNextSeo } from 'next-seo/pages'
import NextHead from 'next/head'

// next-seo 7 removed the <NextSeo> component for the pages router; it now exposes
// generateNextSeo(props) which returns the SEO meta nodes to drop into <Head>.
export function CustomHead({
  title,
  description,
  image,
  keywords,
  twitter = { handle: '@techanv' },
}) {
  return (
    <NextHead>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      <meta name="robots" content={'noindex,nofollow'} />
      <meta name="googlebot" content={'noindex,nofollow'} />

      <meta
        name="keywords"
        content={keywords && keywords.length ? keywords.join(',') : keywords}
      />
      <meta name="author" content="Techanv Consulting" />
      <meta name="referrer" content="no-referrer" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="US" />

      {/* START FAVICON */}
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      {/* END FAVICON */}

      {generateNextSeo({
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          locale: 'en_US',
          images: [
            {
              url: image ? image : '/og.png',
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          defaultImageWidth: 1200,
          defaultImageHeight: 630,
          site_name: '',
        },
        twitter: {
          handle: twitter.handle,
          cardType: 'summary_large_image',
        },
      })}
    </NextHead>
  )
}
