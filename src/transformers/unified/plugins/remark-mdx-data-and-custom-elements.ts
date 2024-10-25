import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"
import type { MdxPreprocessOptionsOutput } from "../../../mdxPreprocess/types.js"

const mdxData = [
    "    export const mdx = __mdx__;",
    "    export const frontmatter = mdx.frontmatter;",
]

const mdxElements = [
    '    import { getContext as getContext_ } from "svelte";',
    '    const MdxElements = getContext_("mdxElements") ?? {};',
]

// Exported for Vitest.
export const moduleScriptRegex =
    /(<script\s+[^>]*(context="module"|module)[^>]*>)(.*?)(<\/script>)/s
// Exported for Vitest.
export const normalScriptRegex =
    /(<script\b(?!.*(context=|module)).*?>)(.*?)(<\/script>)/s

export default (options: MdxPreprocessOptionsOutput): Transformer<Root> => {
    const normalImports = options.imports
        .filter((i) => !i.context)
        .flatMap((i) => i.imports)
    const moduleImports = options.imports
        .filter((i) => i.context)
        .flatMap((i) => i.imports)

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
                        ...moduleImports,
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
                        ...normalImports,
                        content,
                        closingTag,
                    ].join("\n")
                }
            }

            if (isModuleScriptMatched && isNormalScriptMatched) {
                return EXIT
            }
        })

        let indexToInsert = 0

        const firstChild = tree.children.at(0)
        if (firstChild && ["yaml", "toml"].includes(firstChild.type)) {
            indexToInsert = 1
        }

        if (!isModuleScriptMatched) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: [
                    '<script context="module">',
                    ...mdxData,
                    ...moduleImports,
                    "</script>",
                ].join("\n"),
            })

            // NOTE: The order of isModuleScriptMatched and isNormalScriptMatched matters.
            indexToInsert += 1
        }

        if (!isNormalScriptMatched && String(file.value).trim()) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: [
                    "<script>",
                    ...mdxElements,
                    ...normalImports,
                    "</script>",
                ].join("\n"),
            })
        }
    }
}
