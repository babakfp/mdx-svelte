## 3.5.0

-   BREAKING: Renamed `globalImports` to `imports`.
-   FIX: Fixed [#1](https://github.com/babakfp/mdx-svelte/issues/1) issue.
-   Replaced [@shikijs/rehype](https://npmjs.com/package/@shikijs/rehype) with [rehype-pretty-code](https://npmjs.com/package/rehype-pretty-code).
-   Added more styles to the remark-github-alerts plugin, and other improvements.
-   Generally improved the codebase, performance, jsDocs, validations, etc.

## 3.4.0

-   Find and replace HTML elements with custom components using CSS selectors.
-   Can globally import (auto import) components and whatever into Markdown files.

## 3.3.0

-   Exported missing `isHrefExternal` helper from unified transformer (`"mdx-svelte/unified"`).
-   Trimmed empty last line from code blocks.
