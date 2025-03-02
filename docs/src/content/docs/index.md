---
title: MDX Svelte
description: MDX for Svelte - A Svelte Preprocessor that allows you to write Svelte code in Markdown files.
---

MDX for Svelte. Svelte in Markdown. A Markdown preprocessor for Svelte. A Preprocessor for Svelte that allows you to write Svelte code inside Markdown files.

<!-- prettier-ignore -->
```svelte
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

Hey there! Welcome to [MDX Svelte](https://github.com/babakfp/mdx-svelte). Ever wished you could sprinkle some Svelte magic into your Markdown files? Well, now you can! With [MDX Svelte](https://github.com/babakfp/mdx-svelte), writing Svelte code directly in Markdown is a breeze. Whether you're jazzing up docs, crafting tutorials, or spicing up your content, we've got you covered. Say goodbye to boring Markdown and hello to dynamic, interactive content. Ready to level up your Markdown game? Let's dive in!

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
