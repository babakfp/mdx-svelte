import type { Root } from "mdast"
import type { Transformer } from "unified"
import { EXIT, visit } from "unist-util-visit"

const mdxCustomElementsContext = `
    import { getContext as mdx_getContext } from "svelte";
    const MdxCustomElements = mdx_getContext("MdxCustomElements") ?? {};
`

const moduleScriptRegex =
    /<script\s+[^>]*context="module"[^>]*>(.*?)<\/script>/s
const normalScriptRegex = /<script\b(?!.*context=).*?>(.*?)<\/script>/s

export default (): Transformer<Root> => {
    return (tree, file) => {
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

        let indexToInsert = tree.children.length > 0 ? 1 : 0

        if (!isModuleScriptMatched) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: `<script context="module">
                    export const mdxData = __mdxData__;
                </script>`,
            })

            // NOTE: The order of isModuleScriptMatched and isNormalScriptMatched matters.
            indexToInsert += 1
        }

        if (!isNormalScriptMatched && String(file.value).trim()) {
            tree.children.splice(indexToInsert, 0, {
                type: "html",
                value: `<script>${mdxCustomElementsContext}</script>`,
            })
        }
    }
}
