# zkPass

Marketing/brand website for zkPass. Built with Next.js (pages router), TinaCMS for content, and a WebGL/GSAP-driven frontend.

---

## Requirements

| Tool | Version                             | Why                                                                                                                            |
| ---- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Node | **18** (`.nvmrc`)                   | Native deps (`better-sqlite3`) don't build on Node 24.                                                                         |
| pnpm | **8** (pinned via `packageManager`) | Repo lockfile is `lockfileVersion 6.0` (pnpm 8). **Do not use npm** — it ignores `pnpm.overrides` and breaks dependency dedup. |

> ⚠️ This is a **pnpm** project. Using `npm`/`yarn` produces duplicate `scheduler` / `react-lenis` versions and a failed build.

## Setup

```bash
# 1. Use the right Node version
nvm use            # reads .nvmrc -> Node 18

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

This runs `tinacms dev -c "next dev"`, which starts **two** things:

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

| Command        | Description                                                                         |
| -------------- | ----------------------------------------------------------------------------------- |
| `pnpm dev`     | Tina GraphQL + Next.js dev server (use this).                                       |
| `pnpm build`   | `tinacms build && next build` — production build (needs Tina Cloud env, see below). |
| `pnpm start`   | Build then serve production on port `9992`.                                         |
| `pnpm lint`    | Next.js ESLint.                                                                     |
| `pnpm analyze` | Build with the bundle analyzer.                                                     |
| `pnpm size`    | Build and run size-limit.                                                           |

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
(Technologies, Solutions, Features, Hybrid ZK, Use Cases) are hard-coded in
`components/header/index.js` and `components/header/mobile/index.js`.

## Stack

- [Next.js](https://nextjs.org/) (pages router) · [TinaCMS](https://tina.io/) (content + GraphQL)
- [Three.js](https://threejs.org/) · [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) · [@react-three/drei](https://github.com/pmndrs/drei) · [postprocessing](https://github.com/pmndrs/postprocessing)
- [GSAP](https://greensock.com/gsap/) · [Lenis](https://github.com/studio-freight/lenis) · [Tempus](https://github.com/studio-freight/tempus) · [Theatre.js](https://www.theatrejs.com/)
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

- ESLint (Next + Prettier configs) · Prettier (no semicolons, single quotes, `endOfLine: auto`)
- Husky + lint-staged pre-commit hooks

## Troubleshooting

| Symptom                                           | Cause / Fix                                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `TypeError: fetch failed` in `getStaticProps`     | Tina GraphQL server not running. Use `pnpm dev`, not `next dev`.                                                         |
| `Multiple versions of scheduler` / `react-lenis`  | You used `npm`. Delete `node_modules` + `package-lock.json`, run `pnpm install`. Dedup is enforced via `pnpm.overrides`. |
| `better-sqlite3` build error (V8 / `node-gyp`)    | Wrong Node version. Run `nvm use` (Node 18).                                                                             |
| `ERR_PNPM_LOCKFILE_BREAKING_CHANGE`               | A newer pnpm rewrote the lock. Use pnpm 8 (`corepack enable` honors the pinned `packageManager`).                        |
| `Warning: __non_webpack_require__ is not defined` | Harmless — from Tina's local `better-sqlite3` backend. Ignore.                                                           |
