import type { Root } from "hast"
import { selectAll } from "hast-util-select"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import type { MdxPreprocessOptionsOutput } from "../../../mdxPreprocess/types.js"

export default (options: MdxPreprocessOptionsOutput): Transformer<Root> => {
    return (tree, file) => {
        const frontmatterLayout =
            file.data.frontmatter && "layout" in file.data.frontmatter
                ? typeof file.data.frontmatter.layout === "string" &&
                  file.data.frontmatter.layout.length > 0
                    ? file.data.frontmatter.layout
                    : undefined
                : undefined

        const elements = Array.isArray(options.elements)
            ? options.elements
            : frontmatterLayout && options.elements?.[frontmatterLayout]
              ? options.elements[frontmatterLayout]
              : []

        if (!elements.length) return

        const advancedElements = elements.filter((el) => typeof el !== "string")

        advancedElements.forEach((el) => {
            const nodes = selectAll(el.selector, tree)

            nodes.forEach((node) => {
                node.tagName = `MdxElements.${el.tag}`
            })
        })

        const simpleElements = elements.filter((el) => typeof el === "string")

        visit(tree, "element", (node) => {
            if (simpleElements.includes(node.tagName)) {
                node.tagName = `MdxElements.${node.tagName}`
            }
        })
    }
}
