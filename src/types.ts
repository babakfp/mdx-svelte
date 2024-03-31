import * as v from "valibot"
import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"

import { DEFAULT_EXTENSIONS } from "./constants.js"

/**
 * Unwraps named object types for improved readability.
 * {@link https://www.totaltypescript.com/concepts/the-prettify-helper The `Prettify` Helper}.
 */
type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

/**
 * Same as `Required`, it also makes the properties non-optional.
 * {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype TypeScript `NonNullable` type}.
 */
export type RequiredNonNullable<T> = Prettify<{
    [K in keyof T]-?: NonNullable<T[K]>
}>

/**
 * Svelte markup preprocessor options.
 */
export type MarkupPreprocessorOptions = Parameters<MarkupPreprocessor>[0]

/**
 * Svelte in Markdown config callback options.
 */
export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems` options.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (
        options: RequiredNonNullable<MarkupPreprocessorOptions>
    ) => boolean

    /**
     * Use this to build your own transformer.
     */
    onTransform?: (
        markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
        config?: any
    ) => Promise<{
        content: string
        data: MarkdownData
    }>
}

/**
 * Svelte in Markdown config options.
 */
export const ConfigSchema = v.optional(
    v.object({
        /** File extensions to be preprocessed. */
        extensions: v.optional(
            v.array(
                v.string([
                    v.minLength(1),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        `Invalid file extension! Valid examples: ${JSON.stringify(
                            DEFAULT_EXTENSIONS
                        )}.`
                    ),
                ]),
                [v.minLength(1)]
            ),
            DEFAULT_EXTENSIONS
        ),
        /** Should files in packages located in the `node_modules` folder be preprocessed? */
        allowNodeModules: v.optional(v.boolean(), false),
        /** Include the name of the installed packages you want to exclude from being preprocessed. */
        allowNodeModulesItems: v.optional(
            v.array(v.string([v.minLength(1)])),
            []
        ),
    }),
    {}
)

export type ConfigInput = v.Input<typeof ConfigSchema>
export type ConfigOutput = v.Output<typeof ConfigSchema>

// TODO: Maybe make it generic
// Record<"frontmatter", Record<string, unknown>> & Record<string, unknown>
export type MarkdownData = Data
