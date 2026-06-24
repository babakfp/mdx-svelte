---
title: Build a Transformer
---

`myTransformer.ts`:

```ts
import type {
    MdxPreprocessOptionsInput,
    MdxPreprocessOptionsOutput,
} from "mdx-svelte"
import type { MarkupPreprocessor } from "svelte/compiler"

type MyTransformerOptions = {}

export const myTransformer = ((
    // Markdown files (absolute) path and content.
    markup: Parameters<MarkupPreprocessor>[0],

    // The config that is passed to the `mdxPreprocess()`.
    mdxPreprocessOptions: MdxPreprocessOptionsOutput,

    // Your transformer options.
    transformerOptions?: MyTransformerOptions,
) => {
    // ...
}) satisfies MdxPreprocessOptionsInput["onTransform"]
```

`svelte.config.js`:

```js
import { myTransformer } from "$lib/myTransformer"

mdxPreprocess({
    onTransform: (markup, options) => {
        return myTransformer(markup, options, {
            // ...
        })
    },
})
```
