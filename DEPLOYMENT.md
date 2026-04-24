# Deployment Guide for WriteSpace

This document describes how to deploy the WriteSpace application, including environment variables, Vercel configuration, and CI/CD notes.

---

## 1. Prerequisites

- Node.js v18+ installed locally
- Vercel account (or alternative hosting supporting Vite + React)
- Git repository access

---

## 2. Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

| Variable Name                | Description                                | Example Value            |
|------------------------------|--------------------------------------------|--------------------------|
| `VITE_API_URL`               | Backend API base URL                       | `https://api.example.com`|
| `VITE_APP_ENV`               | App environment (`development`/`production`)| `production`             |
| `VITE_ANALYTICS_KEY`         | (Optional) Analytics service key           | `UA-XXXXXX-X`            |

**How to set:**

- Create a `.env` file in the project root.
- Add variables as needed, e.g.:
  ```
  VITE_API_URL=https://api.example.com
  VITE_APP_ENV=production
  ```

---

## 3. Vercel Deployment

### Automatic (Recommended)

1. **Connect Repository:**  
   Import your GitHub/GitLab/Bitbucket repository into Vercel.

2. **Configure Build Settings:**  
   Vercel auto-detects Vite + React. If needed, set:
   - **Framework Preset:** `Vite`
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`

3. **Set Environment Variables:**  
   In the Vercel dashboard, go to **Project Settings > Environment Variables** and add all required `VITE_` variables.

4. **Deploy:**  
   Push to your main branch. Vercel will build and deploy automatically.

### Manual

1. **Build Locally:**
   ```
   npm install
   npm run build
   ```

2. **Deploy Output:**  
   Upload the contents of the `dist/` folder to your static hosting provider.

---

## 4. CI/CD Notes

- **Vercel:**  
  Every push to the main branch triggers a new deployment. Pull requests create preview deployments.

- **Custom CI/CD:**  
  - Use `npm ci` for clean installs.
  - Run `npm run build` to generate the production build.
  - Ensure `.env` variables are set in your CI/CD environment.

- **Testing:**  
  Add test scripts to your pipeline as needed (e.g., `npm test`).

---

## 5. Additional Notes

- **Routing:**  
  If using client-side routing, ensure your host is configured to serve `index.html` for all routes (Vercel handles this automatically).

- **Cache:**  
  Vercel and most static hosts handle cache busting via hashed filenames in `dist/`.

- **Analytics & Monitoring:**  
  Set up any analytics or error monitoring keys via environment variables.

---

## 6. Troubleshooting

- **Build Fails:**  
  - Check Node.js version.
  - Ensure all `VITE_` environment variables are set.
  - Review Vercel build logs for errors.

- **404s on Refresh:**  
  - Make sure your host supports SPA fallback to `index.html`.

---

## 7. References

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

---

**Contact your team lead for questions about deployment or environment configuration.**