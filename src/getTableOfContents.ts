export type TableOfContents = {
    level: string
    textContent: string
    attributes: { [k: string]: string | null }
}[]

export type Options = (
    | {
          containerElement?: Element
          containerSelector?: never // WTF TypeScript!
      }
    | {
          containerElement?: never // WTF TypeScript!
          containerSelector?: `#${string}` | `.${string}`
      }
) & { headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[] }

/**
 * When using this way of getting the TOC, please remember to disable `remarkToc` built-in Unified plugin.
 */
export const getTableOfContents = (options?: Options) => {
    const headingsDataItems: TableOfContents = []

    const containerElement = options?.containerElement || document.body
    const headingLevels = options?.headingLevels || [1, 2, 3, 4, 5, 6]

    if (!headingLevels.length) return []

    const selectors = headingLevels
        .map((level) => {
            if (!options?.containerSelector) return `h${level}`
            return `${options?.containerSelector} h${level}`
        })
        .join(", ")

    const headingElements = containerElement.querySelectorAll(selectors)

    const filterHeadingAttributes = (headingElement: Element) => {
        return Object.fromEntries(
            Object.entries(headingElement.attributes).map(([_, v]) => [
                v.nodeName,
                v.nodeValue,
            ])
        )
    }

    headingElements.forEach((headingElement) => {
        headingsDataItems.push({
            level: headingElement.tagName[1],
            textContent: headingElement.textContent ?? "",
            attributes: filterHeadingAttributes(headingElement),
        })
    })

    return headingsDataItems
}
