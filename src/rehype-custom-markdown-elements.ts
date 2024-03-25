import { EXIT, visit } from "unist-util-visit"
import type { Transformer } from "unified"
import type { Root } from "hast"

import { ConfigOutput } from "./types.js"
import { getContextImportCode } from "./getContextImportCode.js"

export default (config: ConfigOutput): Transformer<Root> => {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (config.markdownElements.includes(node.tagName)) {
                node.tagName = `MarkdownElements.${node.tagName}`
            }
        })

        visit(tree, "raw", (node) => {
            if (node.value.includes("</script>")) {
                node.value = node.value.replace(
                    "</script>",
                    getContextImportCode + "</script>"
                )
                return EXIT
            }
        })
    }
}
