---
title: Build a Transformer
---

```ts
import type {
    MdxPreprocessOptionsInput,
    MdxPreprocessOptionsOutput,
} from "mdx-svelte"
import type { MarkupPreprocessor } from "svelte/compiler"

type TransformerOptions = {}

const myTransformer = (async (
    // You get every markdown absolute file path and content one-by-one here.
    markup: Parameters<MarkupPreprocessor>[0],
    // You get the config that is passed to the `mdxPreprocess()`.
    mdxPreprocessOptions: MdxPreprocessOptionsOutput,
    // This is your custom options.
    transformerOptions?: TransformerOptions,
) => {
    // ...
}) satisfies MdxPreprocessOptionsInput["onTransform"]
```

`svelte.config.js`:

```ts
mdxPreprocess({
    onTransform: async (markup, options) => {
        return await myTransformer(markup, options, {
            // ...
        })
    },
})
```
