# Google sign-in deployment

The login and signup button reads `NEXT_PUBLIC_GOOGLE_CLIENT_ID`. Next.js embeds this public value during `npm run build`. Setting it only on a running container will not change the already-built browser bundle.

## Required production configuration

1. Set frontend build variable `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to the Google OAuth **Web application** client ID. The existing local frontend configuration has this value; do not copy local environment files wholesale to production.
2. Set backend runtime variable `GOOGLE_CLIENT_ID` to the same client ID. The backend verifies Google ID tokens against this audience.
3. In Google Cloud, verify that the web client permits the actual frontend origin, `https://invoicewala.shop`. Include `https://www.invoicewala.shop` only if the application also serves that origin. The existing integration uses a popup credential flow, not a custom OAuth redirect callback.
4. Rebuild and redeploy the frontend. Restart/redeploy the backend if its runtime configuration changed.
5. Verify that the Google sign-in button renders on both `/login` and `/signup`. Complete a real sign-in with the account owner to check the token verification and dashboard redirect.

## Docker build

The Dockerfile accepts `NEXT_PUBLIC_GOOGLE_CLIENT_ID` as a build argument. Configure the hosting build argument with that exact name; runtime environment settings alone do not populate it. The client ID is public browser configuration. Do not put a client secret into a `NEXT_PUBLIC_` variable.

## Diagnosing the visible message

- `Google login setup pending`: the deployed browser bundle has no client ID. Fix build-time configuration and rebuild.
- `Google login could not load`: the Google Identity Services script failed to load. Check the browser error and network restrictions.
- Backend `Google login is not configured yet`: backend `GOOGLE_CLIENT_ID` is missing.
- Google origin/client errors: verify the OAuth web client configuration for the deployed origin.

Local audit on 18 October 2026 confirmed that the frontend and backend client IDs are present, have the expected client-ID format and match. Production settings and real-account sign-in have not been verified from this checkout.
