---
title: CHANGELOG
---

## 6.0.0

- Breaking: Constants like `DOT_SVELTE` now are exported from `"mdx-svelte/extensions"`.
- Breaking/Fix: Revisit `plugins.before/after` in Unified transformer because allowed TS type changed.
- Breaking: Change shiki default theme to `slack-dark` which matches vsCode "Dark Modern" theme.

- Feature: Add new ["remark-breaks"](https://npmjs.com/package/remark-breaks) plugin. Enabled by default.
- Feature: Add new `remarkPlugins` and `rehypePlugins` options to the Unified transformer. This makes it easy to add custom plugins instead of using the `plugins.before/after` api.
- Feature/Patch/Fix: The `plugins.before/after` properties in Unified transformer now understands TS type between Remark and Rehype plugins.

## 5.0.0

### Breaking Changes

- Switched from [rehype-pretty-code](https://npmjs.com/package/rehype-pretty-code) to [@shikijs/rehype](https://npmjs.com/package/@shikijs/rehype).

### Non Breaking Changes

- Moved `"hast-util-to-html"` to `"dependencies"`.
