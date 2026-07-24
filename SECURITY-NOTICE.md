# Critical Security Notice

A Gmail application password was present in the original uploaded source code. It has been removed from this revised project, but deletion from the current files does not make the old credential safe.

## Required action before deployment

- Revoke the old Gmail app password immediately.
- Generate a new app password only if needed.
- Store the replacement only in Hostinger environment variables.
- Review GitHub history because the old value may remain in earlier commits.
- Consider removing the secret from Git history with an appropriate secret-removal tool, then rotate it regardless.

Never commit `.env`, `.env.local`, application passwords, API keys, or database credentials.
