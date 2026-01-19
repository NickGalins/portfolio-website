# Security Guidelines

Security best practices and issue tracking for the portfolio website.

**Last Audit:** 2026-01-18 | **Status:** SECURE (Low Risk)

## Current Security Status

| Area                | Status   | Notes                                    |
| ------------------- | -------- | ---------------------------------------- |
| Secrets/credentials | PASS     | No API keys or secrets in repo           |
| .env files          | PASS     | Properly gitignored, none committed      |
| GitHub Actions      | PASS     | Secure permissions, pinned versions      |
| .gitignore          | PASS     | Properly excludes sensitive files        |
| External links      | PASS     | Uses `rel="noopener"` on external links  |
| Dangerous patterns  | PASS     | No eval(), exec(), or similar found      |
| HTTPS               | PASS     | Enforced by GitHub Pages                 |
| Content injection   | Low risk | XML content is author-controlled         |

---

## Best Practices

### Content Security

- **No user-generated content** - All XML content is author-controlled
- **HTML in XML** - Only use trusted HTML in `<body>` and CDATA sections
- **Image sources** - Only use local assets (`/assets/images/`) or trusted CDNs
- **External links** - Use `rel="noopener noreferrer"` for external links (added in templates)

### Dependency Management

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Update dependencies
npm update
```

**Review schedule:** Check `npm audit` before each deployment or monthly.

### Secrets and Credentials

**Never commit:**

- API keys or tokens
- Database credentials
- Private keys
- `.env` files with secrets

**Currently safe:**

- No backend/database
- No API integrations requiring keys
- GitHub Actions uses repository secrets (not in code)

### External Embeds

| Embed Type      | Source                  | Location                        | Status |
| --------------- | ----------------------- | ------------------------------- | ------ |
| Video           | player.vimeo.com        | `_includes/layouts/base.njk:44` | Safe   |
| Trade skill app | nickgalins.github.io    | `sacred-grounds-shop.xml:88`    | Safe   |
| LinkedIn        | linkedin.com            | `base.njk:224`, `contact.xml`   | Safe   |
| Future embeds   | TBD                     | -                               | Review |

### GitHub Pages Security

- HTTPS enforced automatically
- No server-side code execution (static only)
- Custom domain uses Cloudflare (additional DDoS protection)

---

## Known Issues / Flags

Track potential security concerns here:

### Active Issues

| Issue                     | Severity | Status | Notes                                       |
| ------------------------- | -------- | ------ | ------------------------------------------- |
| Missing package-lock.json | Medium   | Open   | Run `npm install` and commit the lock file  |
| validate script missing   | Low      | Open   | `scripts/validate-xml.js` doesn't exist     |

### Resolved Issues

| Issue | Resolution | Date |
| ----- | ---------- | ---- |
| None yet | - | - |

---

## Security Checklist

Before deploying significant changes:

- [ ] Run `npm audit` - no critical vulnerabilities
- [ ] Review any new dependencies added
- [ ] Check external URLs/embeds are from trusted sources
- [ ] Verify no secrets accidentally committed
- [ ] Test that CSP headers (if any) don't break functionality

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not** open a public GitHub issue
2. Contact the repository owner directly
3. Provide details about the vulnerability and steps to reproduce

---

## Content Security Policy (CSP)

Currently not implemented (GitHub Pages default). If adding CSP headers via Cloudflare:

```text
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  frame-src https://player.vimeo.com;
  font-src 'self';
```

**Note:** `unsafe-inline` needed for current CSS/JS patterns. Consider refactoring if stricter CSP required.

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [npm Security](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)
- [Cloudflare Security](https://developers.cloudflare.com/fundamentals/security/)
