#!/bin/bash
# Fix GitHub Pages deployment issues:
# 1. CSP blocking Cloudflare scripts
# 2. 404 on direct URL / page refresh (SPA routing)
# 3. Blank page on sub-routes

ROOT="${1:-/workspaces/Tatu}"
cd "$ROOT"

echo "Fixing GitHub Pages deployment..."

# ── 1. Fix vite.config.js ─────────────────────────────────────────
# base: '/' means the app works at root domain (tryiteducations.net)
# If hosted at a sub-path like /Tatu/ change base to '/Tatu/'
cat > vite.config.js << 'VEOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',          // change to '/Tatu/' if hosted at github.com/user/Tatu
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react','react-dom','react-router-dom'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})
VEOF
echo "  ✅ vite.config.js updated"

# ── 2. Fix index.html ─────────────────────────────────────────────
# - Remove any strict CSP meta tag
# - Add SPA redirect handler (fixes 404 on refresh)
# - Allow Cloudflare + Razorpay scripts
cat > index.html << 'HEOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#0F2140" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    <!-- CSP: allow scripts from our domains + Razorpay + Google Fonts -->
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self';
      script-src  'self' 'unsafe-inline' 'unsafe-eval'
                  https://checkout.razorpay.com
                  https://static.cloudflareinsights.com
                  https://www.googletagmanager.com;
      style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src    'self' https://fonts.gstatic.com data:;
      img-src     'self' data: blob: https:;
      connect-src 'self' https: wss:;
      frame-src   https://api.razorpay.com https://checkout.razorpay.com;
    "/>

    <!-- SPA redirect handler: fixes 404 on page refresh -->
    <script>
      (function() {
        var redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect !== location.href) {
          history.replaceState(null, null, redirect);
        }
      })();
    </script>

    <title>TryIT Educations — Your Exam. Your Rank. Your Success.</title>
    <meta name="description" content="India's most complete exam preparation platform. 1,10,000+ exam pathways in 40+ languages. Real All-India rankings. Free for 9 vulnerable communities."/>
    <meta property="og:title" content="TryIT Educations"/>
    <meta property="og:description" content="Your Exam. Your Rank. Your Success."/>
    <meta property="og:url" content="https://tryiteducations.net"/>
    <meta property="og:type" content="website"/>

    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>

    <!-- Razorpay -->
    <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HEOF
echo "  ✅ index.html updated (CSP fixed, SPA redirect added)"

# ── 3. Create 404.html for SPA routing ───────────────────────────
# When GitHub Pages gets a request for /dashboard, it returns 404
# This 404.html intercepts it and redirects to index.html
# with the path saved in sessionStorage
mkdir -p public
cat > public/404.html << 'FEOF'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>TryIT Educations</title>
    <script>
      // Save the path and redirect to index.html
      // index.html then reads this and navigates to the right page
      var path = window.location.pathname + window.location.search + window.location.hash;
      sessionStorage.redirect = path;
      window.location.replace('/');
    </script>
  </head>
  <body>
    <p style="font-family:sans-serif;text-align:center;margin-top:40px;color:#1E3A5F">
      Loading TryIT Educations...
    </p>
  </body>
</html>
FEOF
echo "  ✅ public/404.html created (SPA routing fix)"

# ── 4. GitHub Actions workflow for auto-deploy ────────────────────
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'WEOF'
name: Deploy TryIT to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL:      ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_RAZORPAY_KEY:      ${{ secrets.VITE_RAZORPAY_KEY }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
WEOF
echo "  ✅ .github/workflows/deploy.yml created (auto-deploy on push)"

# ── 5. .nojekyll — stops GitHub from processing files ────────────
touch public/.nojekyll
echo "  ✅ public/.nojekyll created"

# ── 6. CNAME for custom domain ────────────────────────────────────
echo "tryiteducations.net" > public/CNAME
echo "  ✅ public/CNAME set to tryiteducations.net"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ GitHub Pages fixes applied!                          ║"
echo "║                                                          ║"
echo "║  Now do this:                                            ║"
echo "║                                                          ║"
echo "║  STEP 1 — Build:                                         ║"
echo "║    npm run build                                         ║"
echo "║                                                          ║"
echo "║  STEP 2 — Push to GitHub:                                ║"
echo "║    git add .                                             ║"
echo "║    git commit -m 'fix: GitHub Pages deployment'          ║"
echo "║    git push origin main                                  ║"
echo "║                                                          ║"
echo "║  STEP 3 — Enable GitHub Pages:                           ║"
echo "║    Go to: github.com/YOUR_USER/Tatu/settings/pages       ║"
echo "║    Source: GitHub Actions                                ║"
echo "║    Save                                                  ║"
echo "║                                                          ║"
echo "║  STEP 4 — Custom domain (optional):                      ║"
echo "║    In Pages settings → Custom domain → tryiteducations.net║"
echo "║    In Cloudflare DNS → CNAME → your-user.github.io      ║"
echo "║                                                          ║"
echo "║  Site will be live in ~2 minutes after push              ║"
echo "╚══════════════════════════════════════════════════════════╝"
