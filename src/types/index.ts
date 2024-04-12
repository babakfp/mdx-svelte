export * from "./MarkdownData.js"
export * from "./MarkupPreprocessorOptions.js"
export * from "./RequiredNonNullable.js"

import * as v from "valibot"

import { ConfigSchema } from "../schemas/index.js"
import type { ConfigCallbacks } from "./ConfigCallbacks.js"

export type ConfigInput = v.Input<typeof ConfigSchema> & ConfigCallbacks
export type ConfigOutput = v.Output<typeof ConfigSchema> & ConfigCallbacks
