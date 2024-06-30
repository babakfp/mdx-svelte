import { z } from "zod"
import { mdxPreprocessSchema } from "../schemas/index.js"
import type { MdxPreprocessConfigCallbacks } from "./MdxPreprocessConfigCallbacks.js"

export * from "./MarkdownData.js"
export * from "./MarkupPreprocessorOptions.js"
export * from "./RequiredNonNullable.js"

export type MdxPreprocessConfigSchemaInput = z.input<
    typeof mdxPreprocessSchema
> &
    MdxPreprocessConfigCallbacks
export type MdxPreprocessConfigSchemaOutput = z.output<
    typeof mdxPreprocessSchema
> &
    MdxPreprocessConfigCallbacks
