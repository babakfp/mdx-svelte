type HeadingLevels = (1 | 2 | 3 | 4 | 5 | 6)[]

type Options = {
    /** @default document.body */
    container?: HTMLElement | string

    /**
     * @default
     * headingLevels.map((level) => `h${level}`).join(", ")
     */
    querySelector?: (headingLevels: HeadingLevels) => string

    /**
     * @default
     * [2, 3, 4, 5, 6]
     */
    headingLevels?: HeadingLevels
}

type TocItem = {
    level: string
    textContent: string
    attributes: { [x: string]: string | null }
}

/**
 * Use this on the client side to generate a table of contents.
 *
 * Example return value:
 *
 * ```ts
 * [
 *     {
 *         level: "1",
 *         textContent: "Intro",
 *         attributes: { id: "intro" },
 *     },
 * ]
 * ```
 *
 * @param options
 * @returns
 */
export const makeToc = (options?: Options) => {
    const DEFAULT_HEADING_LEVELS = [2, 3, 4, 5, 6] satisfies HeadingLevels

    if (typeof document === "undefined") {
        return []
    }

    const container =
        (typeof options?.container === "string"
            ? document.querySelector(options.container)
            : options?.container) || document.body
    const headingLevels = options?.headingLevels?.length
        ? options.headingLevels
        : DEFAULT_HEADING_LEVELS

    const querySelector =
        options?.querySelector?.(headingLevels) ??
        headingLevels.map((level) => `h${level}`).join(", ")
    const headingElements = container.querySelectorAll(querySelector)

    const tocItems: TocItem[] = []

    headingElements.forEach((headingElement) => {
        tocItems.push({
            level: headingElement.tagName[1],
            textContent: headingElement.textContent ?? "",
            attributes: filterHeadingAttributes(headingElement),
        })
    })

    return tocItems
}

const filterHeadingAttributes = (headingElement: Element) => {
    return Object.fromEntries(
        Object.entries(headingElement.attributes).map(([_, v]) => [
            v.nodeName,
            v.nodeValue,
        ]),
    )
}
