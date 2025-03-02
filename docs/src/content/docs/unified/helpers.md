---
title: Helpers
---

## `hastFromHtml`

This helper function helps you to get HTML AST from HTML string.

```ts
import { hastFromHtml } from "mdx-svelte/unified"

const svgHast = hastFromHtml(
    `<svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/></svg>`,
)
```

You can use this helper function in plugins like ["rehype-autolink-headings"](https://npmjs.com/package/rehype-autolink-headings).

## `isHrefExternal`

This helper function helps you to check if a URL is external.

```ts
import { isHrefExternal } from "mdx-svelte/unified"

if (
    isHrefExternal("http://example.com") &&
    isHrefExternal("https://example.com")
) {
    // True
}
```
