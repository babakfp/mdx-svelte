---
title: Unified
---

The built-in ["unified"](https://github.com/unifiedjs/unified) transformer is a wrapper around the unified ecosystem.

```ts
import { unifiedTransformer } from "mdx-svelte/unified"

mdxPreprocess({
    onTransform: async (markup, options) => {
        return await unifiedTransformer(markup, options, {
            // ...
        })
    },
})
```

## Related resources

- [`onTransform`](/options#ontransform) in [`mdxPreprocess`](/install#setup).
