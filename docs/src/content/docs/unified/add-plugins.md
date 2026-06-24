---
title: Add Plugins
---

```ts
import myRehypePlugin from "my-rehype-plugin"
import myRemarkPlugin from "my-remark-plugin"

mdxPreprocess({
    onTransform: (markup, options) => {
        return unifiedTransformer(markup, options, {
            remarkPlugins: [
                // Like this:
                myRemarkPlugin,

                // Or like this:
                [myRemarkPlugin],

                // Or this:
                [
                    myRemarkPlugin,
                    {
                        /* Plugin options. */
                    },
                ],
            ],

            rehypePlugins: [myRehypePlugin],
        })
    },
})
```

Another way that you can add custom plugins to the mix, is by adding them before or after a built-in plugin.

Let's say we want to use the ["remark-github-alerts"](https://github.com/hyoban/remark-github-alerts) plugin. It should be added before or after a built-in [remark](https://github.com/remarkjs/remark) plugin. Let's say we want to add it before or after the built-in ["remark-gfm"](https://npmjs.com/package/remark-gfm) plugin.

```ts
import remarkGithubAlerts from "remark-github-alerts"

mdxPreprocess({
    onTransform: async (markup, options) => {
        return await unifiedTransformer(markup, options, {
            remarkGfm: {
                plugins: {
                    // This:
                    after: [remarkGithubAlerts],

                    // Or this:
                    before: [remarkGithubAlerts],
                },
            },
        })
    },
})
```

> [!NOTE]
> It doesn't matter if the built-in plugin is disabled, the custom plugin added by you will work.
