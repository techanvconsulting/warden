import cn from 'clsx'
import { useState } from 'react'
import s from './quickstart.module.scss'

const CMD = 'npx aidlc-sec init --security-baseline'
const REPO = 'https://github.com/techanvconsulting/warden'

export function Quickstart() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(CMD).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }

  return (
    <section className={cn(s.wrapper, 'layout-block')}>
      <p className={cn(s.kicker, 'p')}>{'// get started'}</p>
      <h2 className={cn(s.title, 'h2')}>Install the baseline in one command</h2>
      <p className={cn(s.sub, 'p')}>
        Drop the ruleset into your AI coding agent. Security gates are active
        before the first line of code.
      </p>

      <div className={s.code}>
        <span className={s.prompt}>$</span>
        <code className={s.cmd}>{CMD.replace(/^npx /, '')}</code>
        <button className={s.copy} onClick={copy} aria-label="Copy command">
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </div>

      <div className={s.actions}>
        <a
          className={s.button}
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
        <span className={s.meta}>
          Apache 2.0 · built on awslabs/aidlc-workflows
        </span>
      </div>
    </section>
  )
}
