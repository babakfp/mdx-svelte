[![NPM version](https://img.shields.io/npm/v/mdx-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://npmjs.com/package/mdx-svelte "View on NPM")

# MDX Svelte

A Preprocessor for Svelte that allows writing Svelte code inside Markdown files; Similar to MDX for JSX.

- [Documentation](https://mdx-svelte.vercel.app)
- [CHANGELOG](https://mdx-svelte.vercel.app/changelog)
- [NPM](https://npmjs.com/package/mdx-svelte)

> [!IMPORTANT]
> The latest version of this package is not compatible with Svelte 4. Please use the version `3.8.0` for Svelte 4 compatibility.

## Example (`+page.md`)

```
---
title: Hello, World!
---

<script>
    import Markdown from "./Markdown.md"
    import Component from "./Component.svelte"
</script>

The title of this page is {frontmatter.title}!

<Markdown />
<Component />
```

## Contributions

Awesome, jump in and help however you can! Open issues, submit PRs, improve docs - no worries about not knowing it all, we're all learning.
