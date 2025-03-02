/**
 * Why?
 * To prevent syntax like `:else` from turning into a Directive. Added other symbols too, just in case.
 */

export const BLOCKS = {
    "#": ["if", "each", "await", "key", "snippet"],
    "/": ["if", "each", "await", "key", "snippet"],
    ":": ["else", "then", "catch"],
    "@": ["html", "debug", "const", "render"],
} as const

const BLOCKS_LABELS = {
    "#": "hash",
    "/": "slash",
    ":": "colon",
    "@": "at",
} as const

const REPLACEMENT_TAG = "mdx-"

export const replaceInBlocks = (content: string): string => {
    Object.entries(BLOCKS).forEach(([tag, blocks]) => {
        blocks.forEach((block) => {
            content = content.replaceAll(
                `{${tag}${block}`,
                // @ts-expect-error - I don't care to fix it.
                `{${REPLACEMENT_TAG}${BLOCKS_LABELS[tag]}-${block}`,
            )
        })
    })

    return content
}

export const restoreInBlocks = (content: string): string => {
    Object.entries(BLOCKS).forEach(([tag, blocks]) => {
        blocks.forEach((block) => {
            content = content.replaceAll(
                // @ts-expect-error - I don't care to fix it.
                `{${REPLACEMENT_TAG}${BLOCKS_LABELS[tag]}-${block}`,
                `{${tag}${block}`,
            )
        })
    })

    return content
}
