# Svelte in Markdown

## Limitations

-   Only valid HTML syntax is allowed in markdown files, meaning no syntax, specific to Svelte, like `<svelte:` tags, etc.
-   To use `{}` in attributes in markdown files, they must be wrapped in quotes. Example: `="{}"`.
-   Can't use Script Module (A `<script>` tag with a `context="module"` attribute) in markdown files.

## Todo

-   [ ] Add lots of JSDoc comments.
-   [ ] A Prettier plugin for Svelte inside Markdown.
-   [ ] Add `mdsvex` to `svelte-in-markdown` guide.

## Note

-   We're not directly using the package called `"vfile"`, but it's automatically helping out by providing types.
