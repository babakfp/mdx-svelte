import type { MarkdownData } from "../types/index.js"

export const getMarkdownDataExportCode = (markdownData: MarkdownData) => {
    return `
        export const markdownData_ = ${JSON.stringify(markdownData)};
    `
}
