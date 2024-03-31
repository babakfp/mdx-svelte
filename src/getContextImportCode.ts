export const getContextImportCode = `
    import { getContext as getContext_ } from "svelte";
    const MarkdownElements_ = getContext_("markdownElements_") ?? {};
`
