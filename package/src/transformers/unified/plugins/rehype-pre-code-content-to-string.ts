import type { Root } from "hast"
import { toHtml } from "hast-util-to-html"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "element", (node, index, parent) => {
            if (node.tagName !== "code") return
            if (!parent || index === undefined) return
            if (parent.type !== "element") return
            if (parent.tagName !== "pre") return
            if (node.children.length === 1 && node.children[0].type === "text")
                return // The #1 issue only happens when Shiki turns text into HTML.

            const htmlCode = toHtml(node, {
                allowDangerousHtml: true,
                allowDangerousCharacters: true,
            })

            parent.children.splice(index, 1, {
                type: "raw",
                value: `{@html \`${htmlCode}\`}`,
            })
        })
    }
}
