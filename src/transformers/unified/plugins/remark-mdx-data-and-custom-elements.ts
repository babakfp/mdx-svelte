import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"

const mdxData = [
    "    export const mdx = __mdx__;",
    "    export const frontmatter = mdx.frontmatter;",
]

const mdxElements = [
    '    import { getContext as getContext_ } from "svelte";',
    '    const MdxElements = getContext_("mdxElements") ?? {};',
]

const moduleScriptRegex =
    /(<script\s+[^>]*context="module"[^>]*>)(.*?)(<\/script>)/s
const normalScriptRegex = /(<script\b(?!.*context=).*?>)(.*?)(<\/script>)/s

export default (): Transformer<Root> => {
    return (tree, file) => {
        let isModuleScriptMatched = false
        let isNormalScriptMatched = false

        visit(tree, "html", (node) => {
            if (!isModuleScriptMatched) {
                const match = node.value.match(moduleScriptRegex)
                if (match) {
                    isModuleScriptMatched = true

                    const openingTag = match[1]
                    const content = match[2]
                    const closingTag = match[3]

                    node.value = [
                        openingTag,
                        ...mdxData,
                        content,
                        closingTag,
                    ].join("\n")
                }
            }

            if (!isNormalScriptMatched) {
                const match = node.value.match(normalScriptRegex)
                if (match) {
                    isNormalScriptMatched = true

                    const openingTag = match[1]
                    const content = match[2]
                    const closingTag = match[3]

                    node.value = [
                        openingTag,
                        ...mdxElements,
                        content,
                        closingTag,
                    ].join("\n")
                }
            }

            if (isModuleScriptMatched && isNormalScriptMatched) {
                return EXIT
            }
        })

        let indexToInsert = tree.children.length > 0 ? 1 : 0

        if (!isModuleScriptMatched) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: [
                    '<script context="module">',
                    ...mdxData,
                    "</script>",
                ].join("\n"),
            })

            // NOTE: The order of isModuleScriptMatched and isNormalScriptMatched matters.
            indexToInsert += 1
        }

        if (!isNormalScriptMatched && String(file.value).trim()) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: ["<script>", ...mdxElements, "</script>"].join("\n"),
            })
        }
    }
}
