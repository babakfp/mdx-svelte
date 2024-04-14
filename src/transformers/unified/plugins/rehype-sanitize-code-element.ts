import { stringifyEntities } from "stringify-entities"
import { visit } from "unist-util-visit"
import type { Transformer } from "unified"
import type { Root } from "hast"

// Default values used in `"stringify-entities"` package.
const HTML_DANGEROUS_CHARACTERS = ['"', "&", "'", "<", ">", "`"] as const

// Svelte syntax characters.
const SVELTE_DANGEROUS_CHARACTERS = ["{", "}"] as const

/*
This code resolves an issue with the Rehype Stringify plugin. 
When trying to sanitize custom characters within a code element, 
the plugin mistakenly attempts to sanitize them again, leading to unexpected outcomes. 

To fix this:

1. We convert the node types from `text` to 'raw', bypassing the plugin's sanitation process.
2. Then, we use the same library that the plugin uses to sanitize both its default characters 
   and our custom characters related to Svelte syntax.
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (node.tagName !== "code") return

            visit(node, "text", (text_node, text_index, text_parent) => {
                if (!text_parent || text_index === undefined) return

                text_parent.children.splice(text_index, 1, {
                    type: "raw",
                    value: stringifyEntities(text_node.value, {
                        subset: [
                            ...HTML_DANGEROUS_CHARACTERS,
                            ...SVELTE_DANGEROUS_CHARACTERS,
                        ],
                    }),
                })
            })
        })
    }
}
