/**
 * Why do we transform Svelte Special Tags?
 * Transforming Svelte Special Tags is necessary to prevent them from being misinterpreted by markdown parsers. For example, tags like `<svelte:head>` could be incorrectly parsed as markdown links, and elements like `<svelte:element this="div"></svelte:element>` might result in garbled output (e.g., `'<p>&#x3C;svelte<div></div> this="div">&#x3C;/svelte<div></div>></p>'`).
 * More details: https://github.com/orgs/remarkjs/discussions/1308#discussioncomment-9075147
 */

const TAG = "svelte:"
const REPLACEMENT_TAG = "mdx-svelte-"

export const replaceInTags = (content: string): string =>
    content.replaceAll(TAG, REPLACEMENT_TAG)

export const restoreInTags = (content: string): string =>
    content.replaceAll(REPLACEMENT_TAG, TAG)
