export const getContextImportCode = `
    import { getContext as getContext_ } from "svelte";
    const MarkdownElements = getContext_("markdownElements") ?? {};
`
