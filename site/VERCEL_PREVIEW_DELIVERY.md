# Vercel Preview Delivery — Darb 1718

**Configured:** 2026-11-02. This is an actual, linked GitHub → Vercel project, not a proposed manual CLI deployment.

- Vercel Team: `omarkhair70-droids-projects` (`team_yldGt68LygoeKjcxVBQMPE6H`)
- Project: `darb-1718` (`prj_u0oC87qRToJsCJFeyZJQ7MygkDVh`)
- GitHub repo: `omarkhair70-droid/darb`
- Working branch: `feature/darb-site-foundation-20261102`
- Root Directory: `site` (Next.js application)
- Include source files outside root: **enabled** (the media preparation script uses `../assets/original`)
- Node: **22.x**
- Vercel Authentication: **enabled** on all deployment URLs excluding custom domains; no custom domain attached.
- Automatic Preview deployments: **enabled** on Git-linked branches.
- Production `main`: temporarily **skipped** via Ignore Build Step because the app is not merged and public exhibition data/rights are not approved. Remove this only as part of a separately reviewed launch gate. Do not use `--prod` / promotion for Draft PR #2.
- Ignore Build Step: `if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then exit 0; else exit 1; fi` (Vercel interprets exit 0 as skip, exit 1 as build).
- Verified initial READY Preview deployment: `dpl_37xm74m813EMuhqMnZPcqNyY4GKT`; commit `80b7be602ac65478225b8768c5e2249d955a6fb5`.
- Protected stable branch alias (may change if Vercel rotates aliases): https://darb-1718-git-feature-darb-s-9e3301-omarkhair70-droids-projects.vercel.app/ar

## Normal continuing workflow — no more manual Vercel commands
1. Work on `feature/darb-site-foundation-20261102` and push reviewed commits to GitHub.
2. Vercel's linked Git integration starts a new Preview build automatically.
3. GitHub Actions independently runs typechecks, content checks, production build and Playwright tests.
4. Check both statuses before saying the feature is technically ready.
5. Use the protected branch Preview link to inspect the actual site. A Vercel sign-in may be required.
6. Keep the PR in Draft until art-direction review, official artwork and photographer credits, current address, live event information and CMS ownership are approved.

## Ongoing creative direction
**Git/Preview automation is a delivery mechanism, not an art-direction freeze.** The prototype's CSS, typography and composition remain provisional and may change entirely. Source-informed decisions are retained in the project research files; do not inherit past ChatGPT visual preferences.

## Build/runtime pitfalls
- Every preview build must include the repository's `assets/original` folder so `site/scripts/prepare-media.mjs` can create `site/public/media`.
- Studio intentionally does not activate without an authorized `NEXT_PUBLIC_SANITY_PROJECT_ID`; archival seed data are source-labelled.
- `robots.txt` forbids search indexing; don't switch this off until launch approval.
- Do not grant public deployment bypass or assign a custom public domain without a distinct publishing decision.
- If Vercel reports a failed build, inspect deployment events; CI's local pass doesn't automatically imply Vercel success.
