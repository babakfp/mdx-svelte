import type { Transformer } from "unified"
import type { Root } from "hast"
import { visit, EXIT } from "unist-util-visit"

import { getContextImportCode } from "./getContextImportCode.js"

export default (): Transformer<Root> => {
    return (tree) => {
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
