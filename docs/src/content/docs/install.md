---
title: Install
---

```bash
pnpm add -D mdx-svelte
```

> [!IMPORTANT]
> This library is built to be used in SvelteKit projects only!

## Setup

Import the package and modify the `svelte.config.js` file:

```ts
import { EXTENSIONS, mdxPreprocess } from "mdx-svelte"

const config = {
    extensions: EXTENSIONS,
    preprocess: [mdxPreprocess(), vitePreprocess()],
}
```

> [!IMPORTANT]
> Place `mdxPreprocess()` before `vitePreprocess()`, Otherwise you will encounter unexpected behaviors!

**All done!** Create `src/routes/+page.md` and add your content in:

<!-- prettier-ignore -->
```svelte
---
title: Hello, World!
---

# {frontmatter.title}

Page title is **{frontmatter.title}**.
```

## More help

> [!NOTE]
> Some features and functionalities are documented using jsDoc. Please take a look at everything that this library exports and all of the available configs and options to have a better understanding of things.

You can always send PRs to improve the documentation.
