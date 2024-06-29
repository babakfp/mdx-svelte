export * from "./MarkdownData.js"
export * from "./MarkupPreprocessorOptions.js"
export * from "./RequiredNonNullable.js"

import { z } from "zod"

import { ConfigSchema } from "../schemas/index.js"
import type { ConfigCallbacks } from "./ConfigCallbacks.js"

export type ConfigInput = z.input<typeof ConfigSchema> & ConfigCallbacks
export type ConfigOutput = z.output<typeof ConfigSchema> & ConfigCallbacks
