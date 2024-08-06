import type { ParagraphData, Root } from "mdast"
import type { ContainerDirective } from "mdast-util-directive"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import { capitalize } from "./remark-github-alerts/src/capitalize.js"

export type Options = {
    /**
     * Custom directives to be supported.
     * @default
     * ["info", "warning", "danger", "success", "tip", "details"]
     */
    directives?: string[] // TODO:FEATURE:IDEA: Add support for custom labels for custom directives.
}

export default (options?: Options): Transformer<Root> => {
    return (tree) => {
        visit(tree, (n) => {
            if (n.type !== "containerDirective") return

            const node = n as ContainerDirective

            const DIRECTIVES = [
                "info",
                "warning",
                "danger",
                "success",
                "tip",
                "details",
                ...(options?.directives ?? []),
            ]

            if (!DIRECTIVES.includes(node.name)) return

            node.data = {
                hName: node.name === "details" ? "details" : "div",
                hProperties: {
                    ...node.attributes,
                    class: `remark-directive remark-directive-${node.name}${node.attributes?.class ? "" + node.attributes.class : ""}`,
                },
            }

            if (
                !(
                    node.children[0].type === "paragraph" &&
                    node.children[0].data?.directiveLabel
                )
            ) {
                node.children.splice(0, 0, {
                    type: "paragraph",
                    data: { directiveLabel: true },
                    children: [
                        {
                            type: "text",
                            value: capitalize(node.name),
                        },
                    ],
                })
            }

            if (node.name === "details") {
                ;(node.children[0].data as ParagraphData).hName = "summary"
            }
        })
    }
}
