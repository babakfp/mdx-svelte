---
title: Add plugin
---

The way that you can add custom plugins to the mix, is by adding them before or after a built-in plugin.

Let's say we want to use the ["remark-github-alerts"](https://github.com/hyoban/remark-github-alerts) plugin. It must be added before or after a built-in [remark](https://github.com/remarkjs/remark) plugin. Do the same with [rehype](https://github.com/rehypejs/rehype) plugins too. Let's say we want to add it after the built-in ["remark-gfm"](https://npmjs.com/package/remark-gfm) plugin.

```ts
import remarkExamplePlugin from "remark-example-plugin"

mdxPreprocess({
    onTransform: async (markup, options) => {
        return await unifiedTransformer(markup, options, {
            builtInPlugins: {
                remarkGfm: {
                    plugins: {
                        before: remarkExamplePlugin,
                        after: [
                            () => (tree) => {
                                console.dir(tree)
                            },
                        ],
                    },
                },
            },
        })
    },
})
```

Something like ["remark-github-alerts"](https://github.com/hyoban/remark-github-alerts) is already built-in.

> [!NOTE]
> It doesn't matter if the built-in plugin is disabled, the custom plugin added by you will work.
