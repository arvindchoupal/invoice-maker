<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Verification commands

- Do not run `npm run build`, `next build`, or any production build after code changes unless the user explicitly asks for a build in the current request.
- Prefer targeted linting, type checks, `git diff --check`, and focused browser verification when they are sufficient.

## InvoiceWala SEO change discipline

- Read `SEO_CHANGELOG.md` before changing `/free-invoice`, `/free-invoice-generator`, or related SEO content.
- Keep `/free-invoice` and `/free-invoice-generator` as separate URLs. `/free-invoice` is the functional invoice maker; its complete tool must remain above all long-form SEO content and images.
- Do not change an existing URL, title, meta description, canonical, H1, tool calculation, PDF flow, signup behavior, or existing SEO section unless the user explicitly authorizes that exact change.
- Verify logged-out PDF behavior before changing download or login claims.
- Keep GST examples illustrative, state that rates and treatment vary, and avoid duplicating the dedicated GST landing pages.
- Append every SEO edit to `SEO_CHANGELOG.md` with an IST timestamp, exact files, additions/removals, unchanged elements, rationale, tests, deployment status, live verification, and GSC review dates.
- Never mark a prepared or merged change as deployed without verifying the live page and recording the deployment identifier.
