import type { Root } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

/*
HTML elements that contains (Svelte) curly brackets (in their attributes) will be parsed incorrectly! This fixes that.
```
<button on:click={() => count += 1}>
    Click Me
</button>
```
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "text", (node, index, parent) => {
            if (!parent || index === undefined) return

            const regex =
                /<[^>]+>|<[^>]+\/>|<[^>]+\{[^}]+\}>|<[^>]+\{[^}]+\}\/>/

            if (node.value.match(regex) !== null) {
                parent.children.splice(index, 1, {
                    type: "html",
                    value: node.value,
                })
            }
        })
    }
}
