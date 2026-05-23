import { OrchestraPage, OrchestraToggle } from 'libs/orchestra'

export default function Orchestra() {
  return (
    <OrchestraPage>
      <OrchestraToggle icon="⚙️" title="studio" id="studio" />
      <OrchestraToggle icon="📈" title="performance" id="stats" />
      <OrchestraToggle icon="🌐" title="grid" id="grid" />
      <OrchestraToggle icon="🚧" title="dev" id="dev" />
    </OrchestraPage>
  )
}
