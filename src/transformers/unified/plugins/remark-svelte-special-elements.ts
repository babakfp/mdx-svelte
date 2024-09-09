import type { Root } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import { restoreInElements } from "../../../helpers/transformSpecialElements.js"

export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "code", (node) => {
            node.value = restoreInElements(node.value)
        })
        visit(tree, "html", (node) => {
            node.value = restoreInElements(node.value)
        })
        visit(tree, "text", (node) => {
            node.value = restoreInElements(node.value)
        })
    }
}
