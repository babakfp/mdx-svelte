---
title: Auto-Imports
---

Can globally import (auto import) components and whatever into Markdown files.

`svelte.config.js`:

```ts
mdxPreprocess({
    imports: [
        {
            context: "module",
            imports: ['import MyComponent from "$lib/MyComponent.svelte"'],
        },
        {
            imports: [
                'import MyOtherComponent from "$lib/MyOtherComponent.svelte"',
            ],
        },
    ],
})
```
