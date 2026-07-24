# FIZ Business Solutions Website

Next.js website for ethical academic coaching, research guidance, developmental feedback, proofreading, data-analysis tutoring, and professional communication support.

## Local development

1. Install Node.js 22 or a compatible version.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and provide the SMTP settings.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Required environment variables

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`

Never commit real passwords, application-specific passwords, or API keys to GitHub.

## Checks

- `npm run lint`
- `npm run build`

## Deployment

The production website is deployed from the GitHub `main` branch through Hostinger auto-deployment. Configure the environment variables in Hostinger before redeploying.
