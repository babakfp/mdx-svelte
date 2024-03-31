import type { Transformer } from "unified"
import type { Root } from "hast"
import { visit, SKIP } from "unist-util-visit"

export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "element", (node, index, parent) => {
            if (!parent || index === undefined) return
            if (node.tagName === "style" || node.tagName === "script") return

            delete node.position

            parent.children.splice(
                index,
                1,
                {
                    type: "raw",
                    value: `{#if "${node.tagName}" in MarkdownElements}`,
                },
                {
                    ...node,
                    tagName: "svelte:component",
                    properties: {
                        ...node.properties,
                        this: `{MarkdownElements.${node.tagName}}`,
                    },
                },
                {
                    type: "raw",
                    value: "{:else}",
                },
                {
                    ...node,
                    tagName: "svelte:element",
                    properties: {
                        ...node.properties,
                        this: node.tagName,
                    },
                },
                {
                    type: "raw",
                    value: "{/if}",
                }
            )

            if (node.tagName === "code" || node.tagName === "pre")
                return [SKIP, index + 5]

            return index + 5
        })
    }
}
