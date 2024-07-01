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
        let isModuleScriptMatched = false
        let isNormalScriptMatched = false

        visit(tree, "html", (node) => {
            if (!isModuleScriptMatched) {
                if (node.value.match(moduleScriptRegex)) {
                    isModuleScriptMatched = true

                    node.value = node.value.replace(
                        "</script>",
                        `
                            export const mdxData = __mdxData__;
                        </script>`,
                    )
                }
            }

            if (!isNormalScriptMatched) {
                if (node.value.match(normalScriptRegex)) {
                    isNormalScriptMatched = true

                    node.value = node.value.replace(
                        "</script>",
                        mdxCustomElementsContext + "</script>",
                    )
                }
            }

            if (isModuleScriptMatched && isNormalScriptMatched) {
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
