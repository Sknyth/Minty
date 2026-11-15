# Deploy Minty

## API on Render

1. In Render, create a Blueprint and select this repository. It reads the root `render.yaml` and creates the `minty-api` Node web service.
2. Set these service environment variables:
   - `DATABASE_URL`: production PostgreSQL URL
   - `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`: long random secrets
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `FRONTEND_URLS`: comma-separated production origins for the storefront and admin Vercel projects
3. Render runs `prisma migrate deploy` during build and starts `dist/main.js` on Render's `PORT`.

The default Render hostname for this service is `https://minty-api.onrender.com`. If Render assigns a different hostname, use that hostname in the two Vercel `VITE_API_URL` values and in `FRONTEND_URLS` as applicable.

## Storefront on Vercel

Create a Vercel project from this repository with Root Directory `Frontend`. Keep the included `vercel.json` settings. Set `VITE_API_URL` to the public Render API URL (also set it for Preview if previews need to call the API).

## Admin on Vercel

Create a second Vercel project from this repository with Root Directory `SaaS-Admin-Dashboard`. Set `VITE_API_URL` to the same public Render API URL.

After Vercel assigns both domains, copy their exact origins (scheme plus hostname, no trailing slash) into Render's `FRONTEND_URLS`, separated by commas, then redeploy the API. The committed `.env.production` files use Render's default `minty-api.onrender.com` hostname; Vercel dashboard variables take precedence for each project.
