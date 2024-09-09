import type { Root } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import { restoreInTags } from "../../../helpers/transformSpecialTags.js"

export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "code", (node) => {
            node.value = restoreInTags(node.value)
        })
        visit(tree, "html", (node) => {
            node.value = restoreInTags(node.value)
        })
        visit(tree, "text", (node) => {
            node.value = restoreInTags(node.value)
        })
    }
}
