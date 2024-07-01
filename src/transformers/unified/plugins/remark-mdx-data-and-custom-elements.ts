import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"

const mdxCustomElementsContext = `
    import { getContext as mdx_getContext } from "svelte";
    const MdxCustomElements = mdx_getContext("MdxCustomElements") ?? {};
`

const moduleScriptRegex = /<script\s+context="module"[^>]*>(.*?)<\/script>/s
const normalScriptRegex = /<script\b(?!.*context=).*?>(.*?)<\/script>/s

export default (): Transformer<Root> => {
    return (tree) => {
        let isNormalScriptMatched = false
        let isModuleScriptMatched = false

        visit(tree, "html", (node) => {
            const moduleScriptMatch = node.value.match(moduleScriptRegex)
            if (!isModuleScriptMatched && moduleScriptMatch) {
                isModuleScriptMatched = true

                node.value = node.value.replace(
                    "</script>",
                    `
                        export const mdxData = __mdxData__;
                    </script>`,
                )
            }

            const normalScriptMatch = node.value.match(normalScriptRegex)
            if (!isNormalScriptMatched && normalScriptMatch) {
                isNormalScriptMatched = true

                node.value = node.value.replace(
                    "</script>",
                    "\n" + mdxCustomElementsContext + "</script>",
                )
            }

            if (isNormalScriptMatched && isModuleScriptMatched) {
                return EXIT
            }
        })

        if (!isModuleScriptMatched) {
            tree.children.unshift({
                type: "html",
                value: `<script context="module">
                    export const mdxData = __mdxData__;
                </script>`,
            })
        }

        if (!isNormalScriptMatched) {
            tree.children.unshift({
                type: "html",
                value: `<script>${mdxCustomElementsContext}</script>`,
            })
        }
    }
}
