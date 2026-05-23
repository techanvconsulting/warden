import { Link } from 'components/link'
import cn from 'clsx'
import { useEffect, useState } from 'react'
import { shuffle } from 'txt-shuffle'
import s from './header.module.scss'

export function Header() {
  const anchorLinks = [
    { text: 'Technologies', url: '/#technologies' },
    { text: 'Solutions', url: '/#solutions' },
    { text: 'Features', url: '/#features' },
    { text: 'Tenets', url: '/#tenets' },
    { text: 'Use Cases', url: '/#use-cases' },
  ]

  const [shuffledTexts, setShuffledTexts] = useState({})
  const handleShuffle = (text, cardIndex) => {
    shuffle({
      text: text,
      duration: 0.5,
      stayFrames: 25,
      onUpdate: (output) => {
        setShuffledTexts((prev) => ({ ...prev, [cardIndex]: output }))
      },
    })
  }

  useEffect(() => {
    handleShuffle('WARDEN X TECHANV', 'logo')
    anchorLinks.forEach((link, i) => handleShuffle(link.text, i))
  }, [])

  return (
    <header className={cn(s.header, 'layout-grid', 'desktop-only')}>
      <Link
        href="/"
        className={s.logoLink}
        onMouseEnter={() => {
          handleShuffle('WARDEN X TECHANV', 'logo')
        }}
      >
        {shuffledTexts['logo']}
      </Link>

      {anchorLinks?.map((link, i) => (
        <Link
          className={s.navLink}
          href={link.url}
          key={i}
          onMouseEnter={() => {
            handleShuffle(link.text, i)
          }}
        >
          {shuffledTexts[i]}
        </Link>
      ))}
    </header>
  )
}
