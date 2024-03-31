export const getMarkdownElementsContext = `
    import { getContext as getContext_ } from "svelte";
    const MarkdownElements_ = getContext_("markdownElements_") ?? {};
`
