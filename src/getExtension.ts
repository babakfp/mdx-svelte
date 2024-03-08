import type { Config } from "./types.js"
import { DEFAULT_EXTENSION } from "./constants.js"

export const getExtension = (extension: Partial<Config>["extension"]) => {
    if (!extension) return DEFAULT_EXTENSION

    if (!extension.startsWith(".")) {
        throw new Error(
            `The "extension" must begin with a ".", for example "${DEFAULT_EXTENSION}".`
        )
    }

    if (/[A-Z]/.test(extension)) {
        throw new Error(`The "extension" cannot contain uppercase letters.`)
    }

    return extension
}
