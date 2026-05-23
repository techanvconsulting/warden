import cn from 'clsx'
import s from './terminal.module.scss'

const LINES = [
  { t: 'cmd', text: '$ aidlc-sec init --security-baseline' },
  { t: 'ok', text: '✓ loading security baseline... [12 rules]' },
  { t: 'ok', text: '✓ registering CI pipeline... [7 scanners]' },
  { t: 'ok', text: '✓ activating HITL gates... [3 phases]' },
  { t: 'cmd', text: '$ aidlc-sec scan --phase construction' },
  { t: 'muted', text: 'running gitleaks... pass' },
  { t: 'muted', text: 'running semgrep... pass' },
  { t: 'muted', text: 'running grype... pass' },
  { t: 'block', text: 'running checkov... BLOCK' },
  { t: 'err', text: '✗ SECURITY-06: over-permissive IAM role' },
  { t: 'muted', text: '  iam:* on resource:* — must scope to least privilege' },
  { t: 'warn', text: '⚠ deployment blocked until human reviews gate' },
  { t: 'caret', text: '$ ' },
]

export function Terminal() {
  return (
    <section className={cn(s.wrapper, 'layout-block')}>
      <div className={s.terminal}>
        <div className={s.bar}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.titleBar}>aidlc-sec — security baseline</span>
        </div>
        <div className={s.body}>
          {LINES.map((line, i) => (
            <p key={i} className={cn(s.line, s[line.t])} style={{ '--i': i }}>
              {line.text}
              {line.t === 'caret' && <span className={s.cursor} />}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
