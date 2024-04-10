import { SKIP, visit } from "unist-util-visit"
import type { Transformer } from "unified"
import type { Root } from "mdast"

// This fixes the issue of Svelte Special Tags like `<svelte:head>` being parsed as markdown links.
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "link", (node, index, parent) => {
            if (!parent || index === undefined) return
            if (!/^svelte:[a-z]+$/.test(node.url)) return

            parent.children.splice(index, 1, {
                type: "html",
                value: `<${node.url}>`,
            })

            return SKIP
        })
    }
}
