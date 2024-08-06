import type { Root } from "mdast"
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
    directives?: string[]
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
                    class: `remark-directive remark-directive-${node.name}${node.attributes?.class ?? ""}`,
                },
            }

            if (node.children.length) {
                const firstChild = node.children[0]
                if (firstChild.type === "paragraph") {
                    if (firstChild.data?.directiveLabel) {
                        setDirectiveLabel(true)
                    } else {
                        setDirectiveLabel()
                    }
                }
            } else {
                setDirectiveLabel()
            }

            function setDirectiveLabel(isReplace?: boolean) {
                if (node.name === "details") {
                    node.children.splice(0, isReplace ? 1 : 0, {
                        type: "html",
                        value: `<summary>${capitalize(node.name)}</summary>`,
                    })
                } else {
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
            }
        })
    }
}
