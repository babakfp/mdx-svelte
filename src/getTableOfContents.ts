export type TableOfContents = {
    level: string
    textContent: string
    attributes: { [k: string]: string | null }
}[]

export type Options = (
    | {
          /** @default document.body */
          containerElement?: Element
          containerSelector?: never // WTF TypeScript!
      }
    | {
          containerElement?: never // WTF TypeScript!
          containerSelector?: `#${string}` | `.${string}`
      }
) & {
    /**
     * @default
     * [1, 2, 3, 4, 5, 6]
     */
    headingLevels?: (1 | 2 | 3 | 4 | 5 | 6)[]
}

/**
 * When using this way of getting the TOC, please remember to disable `remarkToc` built-in Unified plugin.
 *
 * ## Example usage
 *
 * ```svelte
 * <script lang="ts">
 *     import { onMount } from "svelte"
 *     import { page } from "$app/stores"
 *     import { browser } from "$app/environment"
 *     import { getTableOfContents } from "svelte-in-markdown/getTableOfContents"
 *
 *     export let isOpen: boolean
 *     export let name: string
 *
 *     type Headings = {
 *         id: string
 *         level: number
 *         textContent: string
 *     }[]
 *
 *     let headings: Headings = []
 *
 *     onMount(() => {
 *         headings = getHeadings()
 *     })
 *
 *     $: if (browser && $page.url.pathname) {
 *         headings = getHeadings()
 *     }
 *
 *     const getHeadings = () =>
 *         getTableOfContents({
 *             containerSelector: ".article-content",
 *             headingLevels: [2, 3, 4, 5, 6],
 *         })?.map(heading => ({
 *             id: heading.attributes.id ?? "",
 *             level: Number(heading.level),
 *             textContent: heading.textContent,
 *         })) satisfies Headings
 * </script>
 *
 * {#if headings.length}
 *     <ul>
 *         {#each headings as heading}
 *             <li>
 *                 <a
 *                     href="#{heading.id}"
 *                     style="margin-left: calc(1rem * {item.level})"
 *                 >
 *                     {heading.textContent}
 *                 </a>
 *             </li>
 *         {/each}
 *     </ul>
 * {:else}
 *     <p>No headings found!</p>
 * {/if}
 * ```
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
