# FameTicker

Next.js 15.5 celebrity news site. App Router, Tailwind CSS 3, TypeScript, Netlify deployment.

## Quick Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Type check: `npx tsc --noEmit`
- Test: none yet (no framework configured)

## Deploy Configuration (configured by /setup-deploy)
- Platform: netlify
- Production URL: https://famticker.netlify.app
- Deploy workflow: auto-deploy on push to main
- Merge method: squash
- Project type: web app
- Post-deploy health check: https://famticker.netlify.app

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: automatic on push to main
- Deploy status: poll production URL
- Health check: https://famticker.netlify.app

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming -> invoke /office-hours
- Strategy/scope -> invoke /plan-ceo-review
- Architecture -> invoke /plan-eng-review
- Bugs/errors -> invoke /investigate
- QA/testing site behavior -> invoke /qa or /qa-only
- Code review/diff check -> invoke /review
- Ship/deploy/PR -> invoke /ship or /land-and-deploy
- Save progress -> invoke /context-save
- Resume context -> invoke /context-restore
