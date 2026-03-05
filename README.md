# rizwankhan
Portfolio

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Deploying to Vercel

### Option 1 – Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel will detect the Vite framework automatically.

### Option 2 – Vercel Dashboard (recommended)

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the **Vite** framework and sets the build command to `npm run build` and the output directory to `dist`.
4. Click **Deploy** – your site will be live in seconds.

> **Note:** The `vercel.json` at the root configures client-side routing so all paths are served by `index.html`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |

