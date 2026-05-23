import cn from 'clsx'
import s from './compliance.module.scss'

const STANDARDS = [
  'OWASP LLM Top 10',
  'NIST AI RMF',
  'EU AI Act',
  'AISVS C09/C10',
  'SOC 2',
  'ISO 27001',
]

const AGENTS = [
  'Claude Code',
  'Amazon Q Developer',
  'GitHub Copilot',
  'Cursor',
  'Kiro',
]

export function Compliance() {
  return (
    <section className={cn(s.wrapper, 'layout-block')}>
      <div className={s.col}>
        <p className={cn(s.kicker, 'p')}>{'// aligned with'}</p>
        <h2 className={cn(s.title, 'h2')}>Compliance, built in</h2>
        <ul className={s.chips}>
          {STANDARDS.map((x) => (
            <li key={x} className={s.chip}>
              {x}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.col}>
        <p className={cn(s.kicker, 'p')}>{'// works with'}</p>
        <h2 className={cn(s.title, 'h2')}>Your AI agents</h2>
        <ul className={s.chips}>
          {AGENTS.map((x) => (
            <li key={x} className={cn(s.chip, s.agent)}>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
