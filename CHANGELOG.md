## 4.0.0

-   Svelte 5 only.
-   [remark-unwrap-images](https://npmjs.com/package/remark-unwrap-images) was depricated, so it got replaced with [rehype-unwrap-images](https://npmjs.com/package/rehype-unwrap-images).

## 3.8.0

-   Supports Svelte 5 `<script module>` syntax.

## 3.7.0

-   Updated dependencies.

## 3.6.6

-   Fixed logic blocks fix not working.

## 3.6.3

-   Fixed logic blocks getting wrapped in `p` tag, and being parsed as directive.
-   Fixed Svelte Special Elements being parsed incorrectly.

## 3.6.1

-   Fixed directives double label issue when using custom labels.

## 3.6.0

-   Added directives support with `remark-directive` plugin.

## 3.5.2

-   Removed regex validation for the `elements` option.

## 3.5.1

-   The `"rehype-pretty-code"` dependency was missing from the `package.json` file.

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
