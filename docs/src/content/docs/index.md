---
title: Write Svelte code in Markdown files
description: A Preprocessor for Svelte that allows writing Svelte code inside Markdown files; Similar to MDX for JSX.
---

A Preprocessor for Svelte that allows writing Svelte code inside Markdown files; Similar to MDX for JSX.

`+page.md`[^1]:

```md
2 plus 2 is {2 + 2}
```

Output:

```html
<p>2 plus 2 is 4</p>
```

## What is this?

MDX Svelte is an alternative to ["mdsvex"](https://github.com/pngwn/mdsvex).

This library exports a function that acts as a preprocessor for Svelte. It transforms Markdown files into HTML, preparing them for further processing by Svelte or other preprocessors.

This library has a built-in [transformer](/transformers) that uses ["unified"](https://github.com/unifiedjs/unified) and its ecosystem, to parse and transform Markdown to HTML.

## When should I use this?

This library is useful when you want to display markdown content on a web page. And it's also useful when you want to use Svelte code inside Markdown files.

> [!IMPORTANT]
> This library is built to be used in SvelteKit projects only!

## What motivated me to create this?

I developed this project due to the issues and limitations with ["mdsvex"](https://github.com/pngwn/mdsvex), which was not receiving updates. Additionally, ["mdsvex"](https://github.com/pngwn/mdsvex) is transitioning out of the ["unified"](https://github.com/unifiedjs/unified) ecosystem, which may not be preferred by everyone.

### What does it address?

- Built-in ["unified"](/unified) transformer with good defaults.
- Offers the flexibility to create custom [transformers](/transformers).
- Can [auto-import](/auto-imports) files and components into Markdown files.
- Built-in [`hastFromHtml`](/unified/helpers#hastfromhtml) and [`isHrefExternal`](/unified/helpers#ishrefexternal) "unified" utilities.
- Eliminates annoying "was created with unknown prop" warnings.
- Allows utilization of the native SvelteKit layouts (`+layout.svelte`).
- Replace HTML elements with components using [tag name](/customize-markdown-elements) or [CSS selectors](/customize-markdown-elements#advanced).
- Enables usage of any code highlighting libraries without encountering issues like the need to escape certain characters to prevent conflicts with Svelte syntax.

## Limitations

- Only works in SvelteKit projects.
- Prettier can't properly format Svelte code in Markdown files.
- No IntelliSense support.

[^1]: File name doesn't need to start with `+page`, it just needs to end with `*.md` (or any of [extensions](/options/#extensions)).

## Docs

Some features and functionalities are documented using jsDoc. Please take a look at everything that this library exports and all of the available configs and options to have a better understanding of things.

You can always send PRs to improve the docs.
