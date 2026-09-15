---
title: CHANGELOG
---

## 6.1.1

- fix: `EXTENSIONS` TypeScript `readonly` error.

## 6.1.0

- feat: wrap component styles in `@layer remark-github-alerts { ... }`.

## 6.0.3

- fix: tests where failing due to a valibot schema issue.

## 6.0.2

Changes to Unified Remark-GitHub-Alerts plugin:

- fix: `border-inline-start` to `border-left`.
- feat: border color from `#888` to `currentColor`. supports light and dark mode.
- feat: add note specific color to `--remark-github-alerts`.
- chore: less code and overall better code quality. same styles in 30 lines less CSS.

## 6.0.1

- feat: export remark-github-alerts plugin.

    ```js
    import remarkGithubAlerts from "mdx-svelte/unified/remark-github-alerts"
    ```

## 6.0.0

**Breaking**:

- Unified transformer options `<core-plugin>.plugins.before|after` TS types changed. Check the updated docs.
- Changed shiki default theme to `slack-dark`. Matches vsCode "Dark Modern" theme.
- `UnifiedTransformerOptions` no longer exported.

**Features**:

- Added new ["remark-breaks"](https://npmjs.com/package/remark-breaks) plugin. Enabled by default.
- Added new `remarkPlugins` and `rehypePlugins` options to the Unified transformer. This makes it easy to add custom plugins instead of using the `<core-plugin>.plugins.before|after` api.
- Unified transformer options `<core-plugin>.plugins.before|after` now correctly distinguishes between Remark and Rehype plugins. Prevents accidentally adding a Remark plugin after a Rehype plugin or adding a Rehype plugin before a Remark plugin.

## 5.0.0

### Breaking Changes

- Switched from [rehype-pretty-code](https://npmjs.com/package/rehype-pretty-code) to [@shikijs/rehype](https://npmjs.com/package/@shikijs/rehype).

### Non Breaking Changes

- Moved `"hast-util-to-html"` to `"dependencies"`.
