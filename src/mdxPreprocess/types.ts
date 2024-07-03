import type { MarkupPreprocessor } from "svelte/compiler"
import type { Data } from "vfile"
import type { z } from "zod"
import type { mdxPreprocessSchema } from "../mdxPreprocess/schema.js"

/** MDX Svelte callback options. */
export type MdxPreprocessCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after the `preprocessDependencies` option.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (options: Parameters<MarkupPreprocessor>[0]) => boolean

    /**
     * Use this to build your own transformer or customize the built-in plugins.
     * You will receive every markdown file and'll get to transform it.
     */
    onTransform?: (
        /** Info about the markdown file that is going to be preprocessed. */
        markup: Parameters<MarkupPreprocessor>[0],
        /** The same options that are passed to the `mdxPreprocess()` function by you. These options are returned after being process. Meaning if an option is not set, it may be set to a default value. */
        options: MdxPreprocessOptionsOutput,
    ) => Promise<{
        /** Transformed content. */
        content: string
        /** Data to be accessible when getting the markdown files via `import.meta.glob` and in the layout file via context. */
        data: Data
    }>
}

export type MdxPreprocessOptionsInput = z.input<typeof mdxPreprocessSchema> &
    MdxPreprocessCallbacks
export type MdxPreprocessOptionsOutput = z.output<typeof mdxPreprocessSchema> &
    MdxPreprocessCallbacks
