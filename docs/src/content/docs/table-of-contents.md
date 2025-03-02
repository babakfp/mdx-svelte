---
title: TOC - Table of Contents
---

The default ["remark-toc"](https://npmjs.com/package/remark-toc) plugin may not generate a TOC for markdown files that are imported as Svelte components. To address this limitation, you can use a built-in function provided by the ["mdx-svelte"](https://github.com/babakfp/mdx-svelte) package.

## Example usage

`+layout.svelte`:

```svelte
<script lang="ts">
    import { makeToc } from "mdx-svelte"

    const headings = makeToc({
        container: ".my-markdown-container",
    })
</script>
```

Returns:

<!-- prettier-ignore -->
```json
[{
    "level": "2", // or 3, 4, 5, 6
    "textContent": "Example usage",
    "attributes": { "id": "example-usage" }
}]
```

> [!WARNING]
> When using this solution, remember to disable the ["remark-toc"](https://npmjs.com/package/remark-toc) plugin.

## How to disable ["remark-toc"](https://npmjs.com/package/remark-toc) plugin?

```ts
import { unifiedTransformer } from "mdx-svelte/unified"

mdxPreprocess({
    onTransform: async (options, config) => {
        return await unifiedTransformer(options, config, {
            builtInPlugins: {
                remarkToc: {
                    enable: false,
                },
            },
        })
    },
})
```
