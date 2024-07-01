import type { Data } from "vfile"
import { z } from "zod"
import { mdxPreprocessSchema } from "../mdxPreprocess/schema.js"
import type { PreprocessFile } from "../types/index.js"

/** MDX Svelte config callback options. */
export type MdxPreprocessConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after the `preprocessDependencies` option.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (options: PreprocessFile) => boolean

    /**
     * Use this to build your own transformer or customize the built-in plugins.
     * You will receive every markdown file and'll get to transform it.
     */
    onTransform?: (
        /** Info about the markdown file that is going to be preprocessed. */
        markupPreprocessorOptions: PreprocessFile,
        /** The config that is passed to `mdxPreprocess()` by you, which also contains the default values for options. */
        config: MdxPreprocessOptionsOutput,
    ) => Promise<{
        /** Transformed content. */
        content: string
        /** Data to be accessible when getting the markdown files via `import.meta.glob` and in the layout file via context. */
        data: Data
    }>
}

export type MdxPreprocessOptionsInput = z.input<typeof mdxPreprocessSchema> &
    MdxPreprocessConfigCallbacks
export type MdxPreprocessOptionsOutput = z.output<typeof mdxPreprocessSchema> &
    MdxPreprocessConfigCallbacks
