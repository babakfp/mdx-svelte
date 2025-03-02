---
title: Customize Markdown Elements
---

You can replace HTML elements of Markdown output with Svelte components.

`img.svelte` (The file name must match the HTML tag name):

```svelte
<script lang="ts">
    export let src: string
</script>

<img {src} />
```

`svelte.config.js`:

```ts
mdxPreprocess({
    elements: ["img"],
})
```

`+layout.svelte`:

```svelte
<script module lang="ts">
    import img from "$lib/markdown/img.svelte"

    export const mdxElements = { img }
</script>

<script lang="ts">
    import { setContext } from "svelte"

    setContext("mdxElements", mdxElements)
</script>
```

## Advanced

Find and replace HTML elements with custom components using CSS selectors.

`svelte.config.js`:

```ts
mdxPreprocess({
    elements: [
        {
            tag: "MyBlockCode",
            selector: "pre code",
        },
        {
            tag: "MyInlineCode",
            selector: ":not(pre) code",
        },
    ],
})
```

[Supported CSS selectors](https://www.npmjs.com/package/hast-util-select#support).

## Related resources

- Learn more about the [`elements`](/options#elements) option.
