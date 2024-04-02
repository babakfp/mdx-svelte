import type { MarkdownData } from "./types.js"

export const getMarkdownDataExportCode = (markdownData: MarkdownData) => {
    return `
        export const markdownData_ = ${JSON.stringify(markdownData)};
    `
}
