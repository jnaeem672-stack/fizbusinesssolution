# Ethical Repositioning Changelog

## 24 July 2026

### Business positioning

- Repositioned the website from assignment completion to ethical learning and research support.
- Replaced order-focused language with consultation, tutoring, coaching, proofreading, and developmental-feedback language.
- Removed claims involving expert-written assignments, AI-free guarantees, plagiarism-free guarantees, guaranteed grades, fake ratings, and unsupported volume/expert statistics.

### Website content

- Rewrote the homepage, services, about, contact, privacy, navigation, footer, calls to action, and email messages.
- Added a dedicated Academic Integrity Policy.
- Added Terms of Service and Acceptable Use.
- Added clear prohibited-service boundaries covering ghostwriting, examinations, impersonation, fabricated research, plagiarism concealment, and dishonest AI use.
- Changed the main conversion action to “Request Learning Support”.

### Forms and application code

- Replaced the assignment order form and API route with a learning-support request form and `/api/support-request` endpoint.
- Added a mandatory academic-integrity confirmation.
- Renamed order-related components, constants, hooks, types, API routes, and email templates.
- Updated confirmation and administrator email templates to use learning-support terminology.

### Security and privacy

- Removed a hardcoded Gmail credential from source code.
- Moved SMTP configuration to protected environment variables.
- Added `.env.example` with placeholders only.
- Restricted uploaded-file URLs to the configured Cloudinary account.
- Added server-side attachment URL validation, file-count controls, size limits, and fetch timeouts.
- Removed ZIP uploads from the public support form.

### SEO and technical updates

- Corrected the canonical domain to `https://fizbusinesssolutions.com`.
- Updated page titles, descriptions, Open Graph data, structured data, sitemap, and robots file.
- Updated project name and Hostinger deployment-package branding.
