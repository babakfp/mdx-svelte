import type { MarkupPreprocessor, PreprocessorGroup } from "svelte/compiler"

const DEFAULT_EXTENSION = ".svelte.md" as const

const markupPreprocessor = (extension: Config["extension"]) => {
    return ((options) => {
        if (!options.filename) return
        if (options.filename.includes("/.svelte-kit/")) return
        if (!options.filename.endsWith(extension)) return
        // ...
    }) satisfies MarkupPreprocessor
}

type Config = {
    extension: `.${string}`
    allowNodeModules: boolean // TODO
}

export const svelteInMarkdown = (config: Partial<Config> = {}) => {
    config.extension = getExtension(config.extension)
    config.allowNodeModules ??= false

    return {
        name: "svelte-in-markdown",
        markup: markupPreprocessor(config.extension),
    } satisfies PreprocessorGroup
}

const getExtension = (extension: Partial<Config>["extension"]) => {
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
