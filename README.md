# TVD — Thilagavishnu Devasthanam

A responsive React + TypeScript + Vite website for TVD, featuring English/Tamil content, darshan and pooja booking interfaces, announcements, gallery, devotional audio, and an interactive Virtual Pooja experience.

## Run locally

**Requirements:** Node.js 20.19+ or 22.12+

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:3000`).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Deploy to Cloudflare Pages

1. Push this project to a GitHub repository.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and configure:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
4. Deploy. Cloudflare will provide a `*.pages.dev` preview domain.
5. To use your own domain, open the Pages project → **Custom domains → Set up a custom domain**, enter your domain, and follow Cloudflare's DNS instructions. If your domain is registered elsewhere, Cloudflare may ask you to add the domain to your Cloudflare account and update its nameservers.
6. After DNS verification and SSL provisioning, test both the root domain and a nested route / page refresh.

The `public/_redirects` file provides SPA fallback routing so direct page refreshes resolve to the React application.

## Notes

- This is a static frontend deployment; no server or API runtime is required for the current project.
- Booking, admin, and payment-related behavior should be connected to a secure backend before accepting real transactions or treating bookings as confirmed. Do not place private API keys in frontend environment variables.
- The Virtual Pooja is a devotional visual interaction only; it does not perform or claim to perform a physical ritual.
