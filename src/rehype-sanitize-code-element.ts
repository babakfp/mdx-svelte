import { stringifyEntities } from "stringify-entities"
import { visit } from "unist-util-visit"
import type { Plugin } from "unified"

import {
    STRINGIFY_ENTITIES_DEFAULT_DANGEROUS_CHARACTERS,
    STRINGIFY_ENTITIES_DEFAULT_SVELTE_DANGEROUS_CHARACTERS,
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
export const rehypeSanitizeCodeElement: Plugin = () => {
    return (tree) => {
        visit(tree, "element", (node) => {
            // @ts-expect-error
            if (node.tagName === "code") {
                visit(node, "text", (childNode) => {
                    // @ts-expect-error
                    childNode.type = "raw"

                    // @ts-expect-error
                    childNode.value = stringifyEntities(
                        // @ts-expect-error
                        childNode.value,
                        {
                            subset: [
                                ...STRINGIFY_ENTITIES_DEFAULT_DANGEROUS_CHARACTERS,
                                ...STRINGIFY_ENTITIES_DEFAULT_SVELTE_DANGEROUS_CHARACTERS,
                            ],
                        }
                    )
                })
            }
        })
    }
}
