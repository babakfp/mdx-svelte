# Svelte in Markdown

## Limitations

-   To use `{}` in attributes in markdown files, they must be wrapped in quotes. Example: `="{}"`.
-   Can't use Script Module (A `<script>` tag with a `context="module"` attribute) in markdown files.

## Todo

-   [ ] Add lots of JSDoc comments.
-   [ ] A Prettier plugin for Svelte inside Markdown.
-   [ ] Should the `declarationMap` option be set to `true` in `tsconfig.json`.
-   [ ] Add `mdsvex` to `svelte-in-markdown` guide.

## Note

-   We're not directly using the package called `"vfile"`, but it's automatically helping out by providing types.
