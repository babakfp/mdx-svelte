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
> Place `mdxPreprocess()` before `vitePreprocess()`, Otherwise you may encounter unexpected behavior!

**All done!** Create `src/routes/+page.md` and add your content in:

```md
---
title: Hello, World!
---

# {frontmatter.title}

Getting the title "{frontmatter.title}" is easy!
```

Output:

```html
<h1>Hello, World!</h1>
<p>Getting the title "Hello, World!" is easy!</p>
```
