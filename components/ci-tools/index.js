import cn from 'clsx'
import s from './ci-tools.module.scss'

const TOOLS = [
  { name: 'gitleaks', scans: 'Secret detection', status: 'pass' },
  { name: 'semgrep', scans: 'SAST / code analysis', status: 'pass' },
  { name: 'grype', scans: 'Dependency CVEs', status: 'pass' },
  { name: 'checkov', scans: 'IaC misconfig', status: 'block' },
  { name: 'trivy', scans: 'Container scanning', status: 'pass' },
  { name: 'bandit', scans: 'Python security', status: 'pass' },
  { name: 'osv-scanner', scans: 'Known vulnerabilities', status: 'pass' },
]

export function CiTools() {
  return (
    <section className={cn(s.wrapper, 'layout-block')}>
      <div className={s.head}>
        <p className={cn(s.kicker, 'p')}>{'// continuous integration'}</p>
        <h2 className={cn(s.title, 'h2')}>7-Tool CI Pipeline</h2>
        <p className={cn(s.sub, 'p')}>
          Every change runs the full pipeline. A single failing check blocks the
          merge until a human reviews the gate.
        </p>
      </div>

      <ul className={s.grid}>
        {TOOLS.map((tool) => (
          <li key={tool.name} className={s.card}>
            <span className={s.name}>{tool.name}</span>
            <span className={s.scans}>{tool.scans}</span>
            <span className={cn(s.status, s[tool.status])}>
              {tool.status === 'block' ? 'BLOCK' : 'PASS'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
