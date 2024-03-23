import { MarkdownData } from "./types.js"
import { getMarkdownDataExportCode } from "./getMarkdownDataExportCode.js"
import { scriptContextModuleWrapper } from "./scriptContextModuleWrapper.js"
import { getContextImportCode } from "./getContextImportCode.js"

export const modifyFinalHtml = (html: string, data: MarkdownData) => {
    if (!html.includes("</script>")) {
        html =
            `<script>
    ${getContextImportCode}
</script>` + html
    }

    html =
        scriptContextModuleWrapper(getMarkdownDataExportCode(data)) +
        "\n" +
        html

    return html
}
