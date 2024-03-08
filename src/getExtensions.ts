import type { Config } from "./types.js"
import { DEFAULT_EXTENSIONS } from "./constants.js"

export const getExtensions = (extensions: Partial<Config>["extensions"]) => {
    if (!extensions || !extensions.length) return DEFAULT_EXTENSIONS

    const regex = /^\.[a-z]+(\.[a-z]+)?$/
    const isValid = extensions.every((extension) => regex.test(extension))
    const examples = DEFAULT_EXTENSIONS.map(
        (extension) => `"${extension}"`
    ).join(", ")

    if (!isValid) {
        throw new Error(`Invalid file extension! Examples: [${examples}]`)
    }

    return extensions
}
