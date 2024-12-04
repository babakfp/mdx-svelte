import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"
import {
    BLOCKS,
    restoreInBlocks,
} from "../../../helpers/transformLogicBlocks.js"

/**
 * Fixes logic blocks from getting wrapped in `p` tags and parsed as directives.
 */
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, (node) => {
            if ("value" in node) {
                node.value = restoreInBlocks(node.value)
            }
        })

        visit(tree, "paragraph", (node, index, parent) => {
            if (!parent || index === undefined) return
            if (!node.children.length) return EXIT

            const firstChild = node.children[0]
            if (firstChild.type !== "text") return EXIT

            for (const [tag, blocks] of Object.entries(BLOCKS)) {
                for (const block of blocks) {
                    if (
                        firstChild.value.startsWith(`{${tag}${block}`) ||
                        firstChild.value.startsWith(`\n{${tag}${block}`)
                    ) {
                        parent.children.splice(index, 1, ...node.children)
                        break
                    }
                }
            }

            return EXIT
        })

        // NOTE: Doing this just in case it gets serialized.
        visit(tree, "text", (node) => {
            for (const [tag, blocks] of Object.entries(BLOCKS)) {
                for (const block of blocks) {
                    if (
                        node.value.startsWith(`{${tag}${block}`) ||
                        node.value.startsWith(`\n{${tag}${block}`)
                    ) {
                        // @ts-expect-error - I don't care to fix it.
                        node.type = "raw"
                    }
                    break
                }
            }
        })
    }
}
