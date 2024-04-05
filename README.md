# Svelte in Markdown

A preprocessor that allows you to write Svelte in Markdown.

## What is this?

This library exports a function that acts as a preprocessor for Svelte. It transforms Markdown files into HTML, preparing them for further processing by Svelte or other preprocessors.

This library uses ["unified"](https://github.com/unifiedjs/unified) and its ecosystem, as a transformer, to parse and transform Markdown to HTML.

This library is an alternative to ["mdsvex"](https://github.com/pngwn/mdsvex).

## When should I use this?

This library is useful when you want to display markdown content on a web page.

> [!IMPORTANT]
> This library is built to be used in a SvelteKit project.

## What motivated me to create this?

I developed this project due to the issues and limitations with ["mdsvex"](https://github.com/pngwn/mdsvex), which was not receiving updates. Additionally, ["mdsvex"](https://github.com/pngwn/mdsvex) is transitioning out of the ["unified"](https://github.com/unifiedjs/unified) ecosystem, which may not be preferred by everyone.

### What does it address?

-   Provides default configurations out of the box.
    -   ["remark-frontmatter"](https://www.npmjs.com/package/remark-frontmatter)
    -   ["remark-frontmatter-yaml"](https://www.npmjs.com/package/remark-frontmatter-yaml)
    -   ["remark-gfm"](https://www.npmjs.com/package/remark-gfm)
    -   ["remark-unwrap-images"](https://www.npmjs.com/package/remark-unwrap-images)
    -   ["remark-toc"](https://www.npmjs.com/package/remark-toc)
    -   ["remark-rehype"](https://www.npmjs.com/package/remark-rehype)
    -   ["rehype-slug"](https://www.npmjs.com/package/rehype-slug)
    -   ["rehype-autolink-headings"](https://www.npmjs.com/package/rehype-autolink-headings)
    -   ["@shikijs/rehype"](https://www.npmjs.com/package/@shikijs/rehype)
    -   ["rehype-external-links"](https://www.npmjs.com/package/rehype-external-links)
-   Enables usage of any code highlighting libraries without encountering issues like the need to escape certain characters to prevent conflicts with Svelte syntax.
-   Allows utilization of the native SvelteKit layout files (`+layout.svelte`).
-   Eliminates annoying "was created with unknown prop" warnings.
-   Offers the flexibility to create custom transformer plugins for alternatives to Markdown.

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

Add this into your layout file (`+layout.svelte`) to get the frontmatter data working:

<!-- prettier-ignore -->
```ts
<script lang="ts">
    import { setContext } from "svelte"

    setContext("markdownElements_", markdownElements)
    //                          ^ IMPORTANT
</script>
```

<!-- prettier-ignore -->
> [!NOTE]
> **Documentation**: Everything is documented using jsDoc/tsDoc. Please take a look at everything that this library exports and all of the available configs and options to have a better understanding of things. Alternatively you can use [tsdocs.dev](https://tsdocs.dev/docs/svelte-in-markdown).

## Limitations

-   Only valid HTML syntax is allowed in markdown files, meaning no syntax, specific to Svelte, like `<svelte:` tags, etc.
-   To use `{}` in attributes in markdown files, they must be wrapped in quotes. Example: `="{}"`.
-   Can't use Script Module (A `<script>` tag with a `context="module"` attribute) in markdown files.
-   You can only use it in SvelteKit projects. (at the moment, I don't care to fix).
    -   It depends on the routing system for passing the markdown data (like the frontmatter data) and custom markdown elements functionality into markdown files. This can be fixed by doing what ["mdsvex"](https://github.com/pngwn/mdsvex) does.
-   Prettier cannot format Svelte code embedded within Markdown files, and there is a lack of IntelliSense support for it as well.

## Transformers

In this context, transformers are functions that take a string as an argument and transform it into a valid HTML or Svelte code.

## Contributions

Feel welcome to open issues and PRs, fix things related to type safety and documentation, jsDoc comments, and more. It's OK to make mistakes and not to know everything.

## Todo

-   [ ] Add `mdsvex` to `svelte-in-markdown` guide.

## Note

-   We're not directly using the package called `"vfile"`, but it's automatically helping out by providing types.
