<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Content and Copy Safety

- Do not rewrite marketing, homepage, product, team, or contact-page copy unless the user explicitly asks for copy changes.
- For copy requests, change only the exact copy surface requested. Do not "improve," reframe, summarize, add headings, add new positioning, or alter nearby paragraphs opportunistically.
- When replacing emails, URLs, social handles, or other contact details, treat the task as a literal find-and-replace unless the user asks for copywriting.
- Before editing `src/app/page.tsx` or other public-facing content, compare the requested change against the current text and state the exact content block you plan to change.
- After content edits, search for the removed/rejected phrases to confirm they are gone and that unrelated copy was not modified.

# Git and PR Safety

- When creating a PR branch from `origin/main`, do not leave the local branch tracking `origin/main`. Create or reset the branch, then push with `git push -u origin HEAD` so the branch tracks its own remote ref.
- Before telling the user to push, run `git branch -vv` and confirm the current branch tracks `origin/<current-branch>`, not `origin/main`.
- Never push directly to `main`/`origin/main` unless the user explicitly requests a direct main push.
