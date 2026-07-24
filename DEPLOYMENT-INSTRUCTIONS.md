# Deployment Instructions

This project is configured as a Next.js website deployed from the GitHub `main` branch through Hostinger auto-deployment.

## 1. Back up the current repository

Before replacing files, create a backup branch or download the existing GitHub repository as a ZIP.

Suggested backup branch name:

```text
backup-before-ethical-rebrand-2026-07-24
```

## 2. Rotate the exposed email credential immediately

The earlier source code contained a Gmail application password in a tracked TypeScript file. Treat that credential as compromised even if the repository was private.

1. Revoke the old Google app password from the relevant Google Account.
2. Create a new app password only if SMTP email remains necessary.
3. Never paste the new password into a source-code file or commit it to GitHub.

## 3. Configure Hostinger environment variables

Add these variables in the Hostinger web application settings:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sending-email@example.com
SMTP_PASS=your-new-app-password
MAIL_TO=the-address-that-should-receive-enquiries@example.com
```

Use real values only inside Hostinger's protected environment-variable settings. Do not add them to `.env.example` or GitHub.

## 4. Publish the updated source

1. Extract the revised ZIP locally.
2. Replace the existing repository files with the revised files.
3. Review the changes before committing.
4. Commit and push to the `main` branch.
5. Hostinger auto-deployment should rebuild and publish the site.

Suggested commit message:

```text
Reposition website as ethical learning and research support
```

## 5. Required checks

Run these commands locally or in CI before publishing:

```bash
npm install
npm run lint
npm run build
```

The project targets Node.js 22 in the current Hostinger configuration.

## 6. Post-deployment testing

Check the following on desktop and mobile:

- Home, Services, About, Contact, Academic Integrity, Terms, and Privacy pages load.
- Navigation and footer policy links work.
- “Request Learning Support” buttons scroll to the support form.
- The support request form rejects submission unless the integrity checkbox is selected.
- Contact and support-request confirmation emails arrive successfully.
- Uploaded files are limited to permitted document/image formats and trusted Cloudinary URLs.
- Canonical URLs, `robots.txt`, and `sitemap.xml` use `https://fizbusinesssolutions.com`.

## 7. Legal and operational review

The policies are practical website drafts, not legal advice. Have a qualified lawyer review the Privacy Policy, Terms, refund arrangements, data-retention practices, and cross-border data handling. Your real service delivery must follow the published academic-integrity promises; changing website wording alone is not sufficient.
