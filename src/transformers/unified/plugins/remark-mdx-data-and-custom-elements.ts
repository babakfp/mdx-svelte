import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"

const customMarkdownElementsContext = `
    import { getContext as mdx_getContext } from "svelte";
    const MdxCustomElements = mdx_getContext("MdxCustomElements") ?? {};
`

const normalScriptRegex = /<script\b(?!.*context=).*?>(.*?)<\/script>/s
const contextModuleScriptRegex =
    /<script\s+context="module"[^>]*>(.*?)<\/script>/s

export default (): Transformer<Root> => {
    let isNormalScriptMatched = false
    let isContextModuleScriptMatched = false

    return (tree) => {
        visit(tree, "html", (node) => {
            const normalScriptMatch = node.value.match(normalScriptRegex)
            if (!isNormalScriptMatched && normalScriptMatch) {
                isNormalScriptMatched = true

                node.value = node.value.replace(
                    "</script>",
                    "\n" + customMarkdownElementsContext + "</script>",
                )
            }

            const contextModuleScriptMatch = node.value.match(
                contextModuleScriptRegex,
            )
            if (!isContextModuleScriptMatched && contextModuleScriptMatch) {
                isContextModuleScriptMatched = true

                node.value = node.value.replace(
                    "</script>",
                    `
                        export const mdxData = __mdxData__;
                    </script>`,
                )
            }

            if (isNormalScriptMatched && isContextModuleScriptMatched) {
                return EXIT
            }
        })

        if (!isNormalScriptMatched) {
            tree.children.unshift({
                type: "html",
                value: `<script>${customMarkdownElementsContext}</script>`,
            })
        }

        if (!isContextModuleScriptMatched) {
            tree.children.unshift({
                type: "html",
                value: `<script context="module">
                    export const mdxData = __mdxData__;
                </script>`,
            })
        }
    }
}
