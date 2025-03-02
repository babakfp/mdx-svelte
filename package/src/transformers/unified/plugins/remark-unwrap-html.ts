import type { Root } from "mdast"
import type { Transformer } from "unified"
import { SKIP, visit } from "unist-util-visit"

/*
Unwraps HTML of Paragraph:
```
{
    type: "paragraph",
    children: [ { type: "html", value: "<svelte:head>" } ],
}
```
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "paragraph", (node, index, parent) => {
            if (!parent || index === undefined) return

            if (node.children[0].type !== "html") return SKIP

            parent.children.splice(index, 1, ...node.children)

            return [SKIP, index + parent.children.length - 1]
        })
    }
}
