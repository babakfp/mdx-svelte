import { getMarkdownDataExportCode } from "./getMarkdownDataExportCode.js"
import { getMarkdownElementsContext } from "./getMarkdownElementsContext.js"
import { scriptContextModuleWrapper } from "./scriptContextModuleWrapper.js"
import type { MarkdownData } from "./types/index.js"

export const modifyFinalHtml = (html: string, data: MarkdownData) => {
    if (!html.includes("</script>")) {
        html = `
            <script>
                ${getMarkdownElementsContext}
            </script>

            ${html}
        `
    }

    html = `
        ${scriptContextModuleWrapper(getMarkdownDataExportCode(data))}
        ${html}
    `

    return html
}
