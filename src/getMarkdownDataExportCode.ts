import type { MarkdownData } from "./types.js"

export const getMarkdownDataExportCode = (markdownData: MarkdownData) => {
    return (
        `export const markdownData = ${JSON.stringify(markdownData)}` +
        "\n" +
        `const { ${Object.keys(markdownData).join(", ")} } = markdownData`
    )
}
