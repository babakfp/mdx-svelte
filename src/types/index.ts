import { z } from "zod"
import { mdxSvelteSchema } from "../schemas/index.js"
import type { MdxSvelteConfigCallbacks } from "./MdxSvelteConfigCallbacks.js"

export * from "./MarkdownData.js"
export * from "./MarkupPreprocessorOptions.js"
export * from "./RequiredNonNullable.js"

export type MdxSvelteConfigSchemaInput = z.input<typeof mdxSvelteSchema> &
    MdxSvelteConfigCallbacks
export type MdxSvelteConfigSchemaOutput = z.output<typeof mdxSvelteSchema> &
    MdxSvelteConfigCallbacks
