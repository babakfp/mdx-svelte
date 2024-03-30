import { stringifyEntities } from "stringify-entities"
import { visit } from "unist-util-visit"
import type { Transformer } from "unified"
import type { Root } from "hast"

import {
    HTML_DANGEROUS_CHARACTERS,
    SVELTE_DANGEROUS_CHARACTERS,
} from "./constants.js"

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

            visit(node, "text", (childNode) => {
                // TODO: Replace parent child instead of modifying the type.
                // @ts-expect-error
                childNode.type = "raw"

                childNode.value = stringifyEntities(childNode.value, {
                    subset: [
                        ...HTML_DANGEROUS_CHARACTERS,
                        ...SVELTE_DANGEROUS_CHARACTERS,
                    ],
                })
            })
        })
    }
}
