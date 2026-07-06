# Learned Lessons Log

Use this file to prevent repeated token waste and repeated mistakes.

```md
### [YYYY-MM-DD] [Short Title]
Cause:
Impact:
Prevention:
Applies to:
```

Rules:
- Add only durable lessons.
- If workflow-specific, also update the relevant skill Gotchas.
- Do not add one-off issues that will not repeat.

### [2026-07-06] [Dynamic Theming and i18n Robustness]
Cause: Hardcoded English text and static font colors were used in some UI components, which conflicted with the dark/light mode context.
Impact: When switching to Spanish, sections of the site remained in English. When switching to dark mode, some text vanished into the background because its color was hardcoded to a dark color or inherited a bad default.
Prevention: NEVER hardcode strings in the UI. Always use the `t()` translation function and update `en.json`/`es.json`. For text colors, do not use static colors like `border-[var(--primary-color)]` on text; rely on css variables (`var(--text-color)`) or opacity values (`opacity: 0.8`) to ensure contrast flips correctly with the theme.
Applies to: All React UI component creation and styling.

### [2026-07-06] [CSS Framework Assumption & Implementation Verification]
Cause: The agent assumed Tailwind CSS was installed because it saw utility classes (e.g., `hover:border-[var(--primary-color)]`) in the codebase, leading to invalid CSS rendering. Furthermore, CSS changes were delivered without programmatic browser verification, causing repeated user frustration due to browser caching and invalid rules (like `:disabled` on a `div`).
Impact: The user was told a feature was fixed multiple times while it remained broken or invisible on their end. This wasted time and broke trust.
Prevention: 
1. **Never assume a framework is installed.** Always check `package.json` before applying framework-specific classes (like Tailwind).
2. **Visual Verification Policy:** Before confirming ANY visual or interactive implementation (like hover states, layout changes), the agent MUST run the `browser_subagent` to physically load the local dev server, inspect the DOM/CSS, and capture screenshots to verify the changes *actually* rendered correctly.
3. **Caching awareness:** If the subagent sees the change but the user doesn't, advise the user to perform a hard refresh (`Ctrl + F5` / `Cmd + Shift + R`).
Applies to: All styling and UI updates.
