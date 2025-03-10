[![NPM version](https://img.shields.io/npm/v/mdx-svelte?style=for-the-badge&label=NPM&color=%23cb0000)](https://npmjs.com/package/mdx-svelte "View on NPM")

# MDX Svelte

MDX for Svelte. Svelte in Markdown. A Markdown preprocessor for Svelte. A Preprocessor for Svelte that allows you to write Svelte code inside Markdown files.

Hey there! Welcome to [MDX Svelte](https://mdx-svelte.vercel.app). Ever wished you could sprinkle some Svelte magic into your Markdown files? Well, now you can! With [MDX Svelte](https://mdx-svelte.vercel.app), writing Svelte code directly in Markdown is a breeze. Whether you're jazzing up docs, crafting tutorials, or spicing up your content, we've got you covered. Say goodbye to boring Markdown and hello to dynamic, interactive content. Ready to level up your Markdown game? Let's dive in!

-   [Documentation](https://mdx-svelte.vercel.app)
-   [CHANGELOG](https://mdx-svelte.vercel.app/changelog)
-   [NPM](https://npmjs.com/package/mdx-svelte)

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
