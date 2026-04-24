# Deployment Guide

This guide will walk you through deploying this Next.js documentation site to Cloudflare Workers using OpenNext.

## Prerequisites

Before you begin, make sure you have:

- Node.js (version 18 or higher)
- npm, yarn, or pnpm package manager
- A Cloudflare account (free tier is sufficient)
- Git (for version control)

## Step 1: Install Dependencies

First, install the required packages for Cloudflare Workers deployment:

```bash
# Install OpenNext Cloudflare adapter
npm install @opennextjs/cloudflare@latest

# Install Wrangler CLI as a dev dependency
npm install -D wrangler@latest
```

## Step 2: Configure Wrangler

Create a `wrangler.toml` file in your project root with the following configuration:

```toml
main = ".open-next/worker.js"
name = "your-app-name"
compatibility_date = "2025-03-25"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"
```

**Important Notes:**

- Replace `your-app-name` with your desired Worker name (must be unique across Cloudflare)
- The `compatibility_date` must be `2024-09-23` or later
- The `nodejs_compat` flag is required for Next.js compatibility

## Step 3: Configure OpenNext

Create an `open-next.config.ts` file in your project root:

```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

This file allows you to configure caching and other OpenNext-specific settings. See the [OpenNext documentation](https://open-next.js.org/) for advanced configuration options.

## Step 4: Update Package.json Scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

**Script Explanations:**

- `preview`: Builds and serves your app locally using the Cloudflare Workers runtime
- `deploy`: Builds and deploys your app to Cloudflare Workers
- `cf-typegen`: Generates TypeScript types for Cloudflare environment variables

## Step 5: Authenticate with Cloudflare

Before deploying, you need to authenticate with Cloudflare:

```bash
npx wrangler login
```

This will open your browser and prompt you to log in to your Cloudflare account and authorize Wrangler.

## Step 6: Test Locally (Optional but Recommended)

Test your application using the Cloudflare Workers runtime locally:

```bash
npm run preview
```

This command:

1. Builds your Next.js application
2. Converts it to Cloudflare Workers format
3. Serves it locally using `wrangler dev`

This is more accurate to production than the standard `npm run dev` command.

## Step 7: Deploy to Cloudflare Workers

Deploy your application:

```bash
npm run deploy
```

This command will:

1. Build your Next.js application
2. Convert it to Cloudflare Workers format using OpenNext
3. Upload static assets to Cloudflare
4. Deploy the Worker to Cloudflare's edge network

## Step 8: Access Your Deployed Site

After successful deployment, you'll see output similar to:

```
✨ Success! Uploaded 42 files (5.44 sec)
Your Worker has access to the following bindings:
Binding            Resource
env.ASSETS         Assets

Uploaded your-app-name (29.11 sec)
Deployed your-app-name triggers (4.31 sec)
  https://your-app-name.your-subdomain.workers.dev
Current Version ID: 05ea0519-7256-40e4-a666-467981828653
```

Your site will be available at the provided URL (e.g., `https://your-app-name.your-subdomain.workers.dev`).

## Custom Domain (Optional)

To use a custom domain instead of the default `*.workers.dev` subdomain:

1. Add your domain to Cloudflare
2. Update your `wrangler.toml` file:

```toml
[env.production]
routes = [
  { pattern = "yourdomain.com/*", custom_domain = true }
]
```

3. Redeploy with:

```bash
npm run deploy
```

## Troubleshooting

### Common Issues

**Build Errors:**

- Ensure your `compatibility_date` is `2024-09-23` or later
- Make sure `nodejs_compat` is included in `compatibility_flags`

**Authentication Issues:**

- Run `npx wrangler login` to authenticate
- Check that your Cloudflare account has Workers enabled

**Deployment Failures:**

- Verify your Worker name is unique
- Check that you have sufficient Cloudflare Workers quota
- Review the build logs for specific error messages

**API Routes Not Working:**

- Ensure your API routes are compatible with Cloudflare Workers
- Check that you're not using Node.js-specific APIs that aren't supported

### Getting Help

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [OpenNext Documentation](https://open-next.js.org/)
- [Next.js on Cloudflare Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)

## Development Workflow

For ongoing development:

1. **Local Development:** Use `npm run dev` for fast iteration
2. **Testing:** Use `npm run preview` to test in Workers runtime
3. **Deployment:** Use `npm run deploy` to deploy changes

## Performance Benefits

Deploying to Cloudflare Workers provides:

- **Global Edge Network:** Your site runs on Cloudflare's 200+ data centers worldwide
- **Fast Cold Starts:** Workers start in ~25ms
- **Automatic Scaling:** Handles traffic spikes automatically
- **Built-in Security:** DDoS protection, WAF, and other security features
- **Cost Effective:** Generous free tier with pay-per-use pricing

## Monitoring and Analytics

After deployment, you can monitor your Worker:

- **Cloudflare Dashboard:** View metrics, logs, and performance data
- **Real-time Logs:** Use `npx wrangler tail` to see live logs
- **Analytics:** Built-in analytics in the Cloudflare dashboard

---

**Need Help?** Check the troubleshooting section above or refer to the official documentation links provided.
