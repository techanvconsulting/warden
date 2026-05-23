import Link from 'next/link'

export default function ServerError() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        textAlign: 'center',
      }}
    >
      <h1>500</h1>
      <p>Something went wrong.</p>
      <Link href="/">Back home</Link>
    </main>
  )
}
