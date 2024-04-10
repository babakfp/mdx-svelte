import { SKIP, visit } from "unist-util-visit"
import type { Transformer } from "unified"
import type { Root } from "mdast"

/*
Turns this:

```
{
    type: 'text',
    value: '</svelte:fragment>',
}
```

To this:

```
{
    type: 'html',
    value: '</svelte:fragment>',
}
```

So that "rehype-stringify" doesn't escape it!
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "text", (node, index, parent) => {
            if (!parent || index === undefined) return
            if (!node.value.startsWith("</")) return

            parent.children.splice(index, 1, {
                type: "html",
                value: node.value,
            })
        })
    }
}
