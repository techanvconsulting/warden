# WARDEN X TECHANV

Marketing/brand website (Warden, a Techanv Consulting project). Built with Next.js (pages router), TinaCMS for content, and a WebGL/GSAP-driven frontend.

Runs on the latest major versions of the stack: **Next 16, React 19, @react-three/fiber 9 / three 0.184 / drei 10, TinaCMS 3, Zustand 5**.

---

## Requirements

| Tool | Version                             | Why                                                                                                                            |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Node | **≥ 20.9** (`.nvmrc` → **22**)      | Next 16 requires Node `>=20.9`. CI reads `.nvmrc`.                                                                             |
| pnpm | **8** (pinned via `packageManager`) | Repo lockfile is `lockfileVersion 6.0` (pnpm 8). **Do not use npm** — it ignores `pnpm.overrides` and breaks dependency dedup. |

> ⚠️ This is a **pnpm** project. Using `npm`/`yarn` produces duplicate `scheduler` / `react` versions and a failed build.

## Setup

```bash
# 1. Use the right Node version
nvm use            # reads .nvmrc -> Node 22

# 2. Enable corepack so the pinned pnpm 8 is used automatically
corepack enable

# 3. Install dependencies
pnpm install
```

No environment variables are required for local development (see [Environment](#environment)).

## Running

```bash
pnpm dev
```

This runs `tinacms dev -c "next dev --webpack"`, which starts **two** things:

- the **TinaCMS local GraphQL server** on `http://localhost:4001/graphql`
- the **Next.js app** on `http://localhost:3000`

| URL                                    | What                             |
| -------------------------------------- | -------------------------------- |
| http://localhost:3000                  | The website                      |
| http://localhost:3000/admin/index.html | TinaCMS visual editor            |
| http://localhost:4001/graphql          | Content GraphQL API + playground |

> ❗ **Do not run `next dev` on its own.** Pages fetch content from the local Tina
> GraphQL server inside `getStaticProps`. Without `tinacms dev` running, that
> server (`localhost:4001`) is down and you get:
> `TypeError: fetch failed` / `Body must be a string`. Always start the app with `pnpm dev`.

## Scripts

| Command        | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `pnpm dev`     | Tina GraphQL + Next.js dev server (use this for development).    |
| `pnpm build`   | Static export to `./out` (see [Build & deploy](#build--deploy)). |
| `pnpm preview` | Serve the built `./out` locally on port `9992`.                  |
| `pnpm lint`    | ESLint (flat config, `eslint.config.mjs`).                       |
| `pnpm analyze` | Build with the bundle analyzer.                                  |

## Build & deploy

The site builds to a fully static `./out` directory (`output: 'export'`) and is
deployed to **GitHub Pages** by `.github/workflows/deploy.yml` on every push to
`main`.

```bash
pnpm build      # -> ./out
pnpm preview    # serve ./out at http://localhost:9992
```

`pnpm build` runs `scripts/build.mjs`, which:

1. starts the Tina local GraphQL server (so `getStaticProps` can fetch content), then
2. runs `next build --webpack` standalone, then
3. shuts the server down.

> ⚠️ The build (and `pnpm dev`) is pinned to the **webpack** bundler via `--webpack`.
> Next 16 defaults to Turbopack, which cannot run this project's custom Sass
> functions (`get`/`getColors`/`getThemes` in `next.config.js`) or the
> `@svgr/webpack` / glsl / graphql loaders. Do not drop the `--webpack` flag.

> ⚠️ Do **not** change the build to `tinacms build -c "next build"`. That wrapper
> triggers a spurious `<Html> should not be imported outside of pages/_document`
> error during static export. Running `next build` standalone against the live
> Tina server (what `scripts/build.mjs` does) is the working approach.

No Tina Cloud credentials are required to build — content comes from the local
markdown in `tina/content/`.

### One-time GitHub setup

- Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- Custom domain `warden.techanv.com` is set via `public/CNAME`. Add a DNS
  `CNAME` record: `warden` → `techanvconsulting.github.io`.
- Not using a custom domain? Delete `public/CNAME` and set
  `basePath`/`assetPrefix` to `/warden` in `next.config.js` (project pages are
  served from `/<repo>`).

## Environment

Local dev works with **no env vars** — Tina runs in local mode against the
markdown content in `tina/content/`.

Editing through Tina Cloud and production builds need credentials (copy
`.env.example` to `.env.local` and fill in):

| Variable                     | Used for                                            |
| ---------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Tina Cloud client id                                |
| `TINA_TOKEN`                 | Tina Cloud read/write token                         |
| `TINA_SEARCH_TOKEN`          | Tina search indexer token                           |
| `VERCEL_GIT_COMMIT_REF`      | Branch Tina reads content from (defaults to `main`) |

## Editing content

Site content lives in `tina/content/` as markdown/JSON:

- `tina/content/pages/home/home.md` — homepage blocks (hero, features, etc.)
- Schema (fields shown in the CMS) is defined in `tina/content/**/index.js`.

The header navigation is **not** in the CMS: the anchor links
(Technologies, Solutions, Features, Tenets, Use Cases) are hard-coded in
`components/header/index.js` and `components/header/mobile/index.js`.

## Stack

- [Next.js](https://nextjs.org/) (pages router) · [TinaCMS](https://tina.io/) (content + GraphQL)
- [Three.js](https://threejs.org/) · [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) · [@react-three/drei](https://github.com/pmndrs/drei) · [postprocessing](https://github.com/pmndrs/postprocessing)
- [GSAP](https://greensock.com/gsap/) · [Lenis](https://github.com/darkroomengineering/lenis) · [Tempus](https://github.com/darkroomengineering/tempus) · [Theatre.js](https://www.theatrejs.com/)
  - Scroll/RAF/measure hooks come from the maintained `lenis` (`lenis/react`), `tempus`, and `hamo` packages (migrated off the deprecated `@studio-freight/*`).
- [Zustand](https://github.com/pmndrs/zustand) (state) · [Embla Carousel](https://www.embla-carousel.com/)
- Sass (CSS Modules) · [@svgr/webpack](https://github.com/gregberge/svgr) (SVG imports, see `next.config.js`)
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) (postbuild)

## Folder structure

Standard Next.js layout (`/public`, `/pages`) plus:

- **/assets** — images, videos, SVGs
- **/components** — reusable components (each with its Sass module)
- **/tina** — TinaCMS config, content, schema, generated client
- **/config** — general settings
- **/hooks** — custom React hooks
- **/layouts** — top-level layout component
- **/libs** — scripts, WebGL, state store
- **/styles** — global styles and Sass partials

## Code style

- ESLint **flat config** (`eslint.config.mjs`, eslint 9) — `next/core-web-vitals` rules + react-hooks, wired via each plugin's native flat config · Prettier (no semicolons, single quotes, `endOfLine: auto`)
- Husky + lint-staged pre-commit hooks

## Troubleshooting

| Symptom                                                        | Cause / Fix                                                                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `TypeError: fetch failed` in `getStaticProps`                  | Tina GraphQL server not running. Use `pnpm dev`, not `next dev`.                                                         |
| `Node.js version ">=20.9.0" is required`                       | Next 16 needs Node ≥ 20.9. Run `nvm use` (reads `.nvmrc` → Node 22).                                                     |
| `sassOptions.functions ... not supported when using Turbopack` | You dropped the `--webpack` flag. Build/dev must run on webpack (`next build --webpack` / `next dev --webpack`).         |
| `Multiple versions of scheduler` / `react`                     | You used `npm`. Delete `node_modules` + `package-lock.json`, run `pnpm install`. Dedup is enforced via `pnpm.overrides`. |
| `better-sqlite3` build error (V8 / `node-gyp`)                 | Wrong Node version. Run `nvm use` (Node 22).                                                                             |
| `ERR_PNPM_LOCKFILE_BREAKING_CHANGE`                            | A newer pnpm rewrote the lock. Use pnpm 8 (`corepack enable` honors the pinned `packageManager`).                        |
| `Warning: __non_webpack_require__ is not defined`              | Harmless — from Tina's local `better-sqlite3` backend. Ignore.                                                           |
