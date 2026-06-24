---
title: Unified
---

The built-in ["unified"](https://github.com/unifiedjs/unified) transformer is a wrapper around the unified ecosystem.

```ts
import { unifiedTransformer } from "mdx-svelte/unified"

mdxPreprocess({
    onTransform: (markup, options) => {
        return unifiedTransformer(markup, options, {
            // ...
        })
    },
})
```

## Related resources

- [`onTransform`](/options#ontransform) in [`mdxPreprocess`](/install#setup).
