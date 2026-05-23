import { Link } from '@studio-freight/compono'
import cn from 'clsx'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import s from './header-mobile.module.scss'

export function HeaderMobile() {
  const anchorLinks = [
    { text: 'Technologies', url: '/#technologies' },
    { text: 'Solutions', url: '/#solutions' },
    { text: 'Features', url: '/#features' },
    { text: 'Hybrid ZK', url: '/#hybrid-zk' },
    { text: 'Use Cases', url: '/#use-cases' },
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    Router.events.on('hashChangeStart', () => setMenuOpen(false))

    return () => {
      Router.events.off('hashChangeStart', () => setMenuOpen(false))
    }
  }, [])

  return (
    <header className={cn(s.headerMobile, 'mobile-only')}>
      <Link href="/" className={s.logoLink}>
        ZkPass
      </Link>

      <button className={s.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div className={cn(s.menu, menuOpen && s.open)}>
        <div className={s.navWrap}>
          <nav>
            {anchorLinks?.map((link, i) => (
              <Link className={cn(s.navLink, 'h1')} href={link.url} key={i}>
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
