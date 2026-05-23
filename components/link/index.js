import NextLink from 'next/link'
import { forwardRef } from 'react'

const SHALLOW_URLS = ['?demo=true']

// Export-safe Link. A drop-in for @studio-freight/compono's Link, but without
// the render-time useRouter() call — that throws "NextRouter was not mounted"
// during `next build` static export (output: 'export'), where RouterContext is null.
export const Link = forwardRef(
  ({ href, children, shallow, scroll, fallback = 'div', ...props }, ref) => {
    if (typeof href !== 'string') {
      const Tag = fallback

      return (
        <Tag ref={ref} {...props}>
          {children}
        </Tag>
      )
    }

    const isExternal = href?.startsWith('http')
    const isProtocol = href?.startsWith('mailto:') || href?.startsWith('tel:')

    if (!isExternal && !href?.startsWith('/') && !isProtocol) {
      href = `/${href}`
    }

    const needsShallow = !!SHALLOW_URLS.find((url) => href?.includes(url))

    return (
      <NextLink
        ref={ref}
        href={href}
        shallow={needsShallow || shallow}
        scroll={scroll}
        {...((isProtocol || isExternal) && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...props}
      >
        {children}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
