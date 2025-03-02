---
title: Options
---

The options are passed to the `mdxPreprocess` function.

## `extensions`

- Optional
- Type: `string[]`
- Default: `[".md"]`

Include the extension of files to be preprocessed and transformed. Don't include the `.svelte` extension.

### Add custom extensions

```ts
import { DOT_SVELTE, mdxPreprocess } from "mdx-svelte"

const DOT_SVELTE_DOT_MD = ".svelte.md"

const config = {
    extensions: [DOT_SVELTE, DOT_SVELTE_DOT_MD],
    preprocess: [
        mdxPreprocess({
            extensions: [DOT_SVELTE_DOT_MD],
        }),
        vitePreprocess(),
    ],
}
```

> [!IMPORTANT]
> Whatever value you add to the `extensions` option, it must be added to the `config.extensions` too.

## `elements`

- Optional
- Type: `string[] | { [x: string]: string[] }`

This option is useful for replacing markdown elements with custom components.

By using an array, all components inside it with be applied to all markdown files.

`svelte.config.js`:

```ts
{
    elements: ["img", "blockquote"],
}
```

`+layout.svelte`:

```svelte
<script module lang="ts">
    import blockquote from "./blockquote.svelte"
    import img from "./img.svelte"

    export const mdxElements = { blockquote, img }
</script>

<script lang="ts">
    import { setContext } from "svelte"

    let { children } = $props()

    setContext("mdxElements", mdxElements)
</script>

{@render children()}
```

A `getContext` will be preprocessed to all of the markdown files to receive the value of `mdxElements`.

### Custom layouts

You can use different components for different collections like posts, documentation, etc.
As an example, let's create a layout named `posts`:

```ts
{
    elements: {
        posts: ["img", "blockquote"],
    },
}
```

Add the following property into the frontmatter of a markdown file of a `posts` collection:

```yaml
---
layout: posts
---
```

## `preprocessDependencies`

- Optional
- Type: `string[]`
- Default: `[]`

Preprocess of the files located in the `node_modules` folder are disabled by default. Include the name of the packages to be preprocessed.

## `onFileIgnore`

> [!NOTE]
> Please refer to the jsDoc comments to learn more.

## `onTransform`

[Example](/unified) usage.

> [!NOTE]
> Please refer to the jsDoc comments to learn more.
