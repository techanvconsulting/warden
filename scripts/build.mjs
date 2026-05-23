// Static build for GitHub Pages.
//
// Pages fetch content from the Tina local GraphQL server (localhost:4001) inside
// getStaticProps, so that server must be running while `next build` prerenders.
//
// We deliberately DO NOT use `tinacms build -c "next build"`: that wrapper triggers
// a spurious `<Html> should not be imported outside of pages/_document` error during
// static export. Running `next build` standalone against a live Tina dev server works.
//
// Flow: start Tina dev server -> wait for :4001 -> `next build` (output: 'export') -> stop server.
import { spawn } from 'node:child_process'

const TINA_URL = 'http://localhost:4001/graphql'

// Poll over HTTP (not raw TCP) so it works whether Tina binds IPv4 or IPv6 —
// `localhost` resolves the same way the generated client does. Any HTTP response
// (even an error status) means the server is up.
function waitForServer(url, timeoutMs = 180000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        await fetch(url, { method: 'GET' })
        resolve()
      } catch {
        if (Date.now() - start > timeoutMs)
          reject(new Error(`Tina server never came up at ${url}`))
        else setTimeout(attempt, 1000)
      }
    }
    attempt()
  })
}

const run = (cmd, args) =>
  spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' })

// Keep the Tina GraphQL server alive via a no-op long-running sub-command.
const tina = run('npx', [
  'tinacms',
  'dev',
  '-c',
  'node -e "setInterval(() => {}, 1e9)"',
])

let code = 1
try {
  await waitForServer(TINA_URL)
  // give Tina a moment to finish indexing + regenerating the local client
  await new Promise((r) => setTimeout(r, 5000))
  const build = run('npx', ['next', 'build'])
  code = await new Promise((resolve) => build.on('exit', (c) => resolve(c ?? 1)))
} catch (err) {
  console.error(err)
} finally {
  tina.kill('SIGTERM')
}

process.exit(code)
