# Svelte in Markdown

A Svelte preprocessor that allows you to write Svelte code in Markdown files.

This library is an alternative to ["mdsvex"](https://github.com/pngwn/mdsvex).

## Why did I build this?

Because ["mdsvex"](https://github.com/pngwn/mdsvex) had issues and limitations, and it wasn't getting updates. So, I thought I could solve them. ["mdsvex"](https://github.com/pngwn/mdsvex) is moving out of the [unified](https://github.com/unifiedjs/unified) ecosystem which my not be desirable for some users.

### What does it solve?

-   Defaults out of the box.
-   -   ["remark-frontmatter"](https://www.npmjs.com/package/remark-frontmatter)
-   -   ["remark-frontmatter-yaml"](https://www.npmjs.com/package/remark-frontmatter-yaml)
-   -   ["remark-gfm"](https://www.npmjs.com/package/remark-gfm)
-   -   ["remark-unwrap-images"](https://www.npmjs.com/package/remark-unwrap-images)
-   -   ["remark-toc"](https://www.npmjs.com/package/remark-toc)
-   -   ["remark-rehype"](https://www.npmjs.com/package/remark-rehype)
-   -   ["rehype-slug"](https://www.npmjs.com/package/rehype-slug)
-   -   ["rehype-autolink-headings"](https://www.npmjs.com/package/rehype-autolink-headings)
-   -   ["@shikijs/rehype"](https://www.npmjs.com/package/@shikijs/rehype)
-   -   ["rehype-external-links"](https://www.npmjs.com/package/rehype-external-links)
-   Use any code highlighting libraries without having weird issues like needing to scape some characters.
-   Use the native SvelteKit layout files (`+layout.svelte`).
-   No annoying "was created with unknown prop" warnings.
-   Create your own transformer plugin for alternatives to Markdown.

## Installation

```bash
pnpm add -D svelte-in-markdown
```

## Getting started

Add the following into the `svelte.config.js` file (in a SvelteKit project):

```ts
import { svelteInMarkdown, DEFAULT_EXTENSIONS } from "svelte-in-markdown"

const config = {
    extensions: [".svelte", ...DEFAULT_EXTENSIONS],
    preprocess: [vitePreprocess(), svelteInMarkdown()],
}
```

<!-- prettier-ignore -->
> [!NOTE]
> **Documentation**: Everything is documented using jsDoc/tsDoc. Please take a look at everything that this library exports and all of the available configs and options to have a better understanding of things. Alternatively you can use [tsdocs.dev](https://tsdocs.dev/docs/svelte-in-markdown).

## Limitations

-   Only valid HTML syntax is allowed in markdown files, meaning no syntax, specific to Svelte, like `<svelte:` tags, etc.
-   To use `{}` in attributes in markdown files, they must be wrapped in quotes. Example: `="{}"`.
-   Can't use Script Module (A `<script>` tag with a `context="module"` attribute) in markdown files.
-   You can only use it in SvelteKit projects. (at the moment, I don't care to fix).
-   -   It depends on the routing system for passing the markdown data (like the frontmatter data) and custom markdown elements functionality into markdown files. This can be fixed by doing what ["mdsvex"](https://github.com/pngwn/mdsvex) does.

## Todo

-   [ ] Add lots of JSDoc comments.
-   [ ] A Prettier plugin for Svelte inside Markdown.
-   [ ] Add `mdsvex` to `svelte-in-markdown` guide.

## Note

-   We're not directly using the package called `"vfile"`, but it's automatically helping out by providing types.
