import { stringifyEntities } from "stringify-entities"
import { visit } from "unist-util-visit"
import type { Plugin } from "unified"

import {
    STRINGIFY_ENTITIES_DEFAULT_DANGEROUS_CHARACTERS,
    STRINGIFY_ENTITIES_DEFAULT_SVELTE_DANGEROUS_CHARACTERS,
} from "./constants.js"

export const rehypeSanitizeMdCode: Plugin = () => {
    return (tree) => {
        visit(tree, "element", (node) => {
            // @ts-ignore
            if (node.tagName === "code") {
                visit(node, "text", (childNode) => {
                    // @ts-ignore
                    childNode.type = "raw"

                    // @ts-ignore
                    childNode.value = stringifyEntities(
                        // @ts-ignore
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
