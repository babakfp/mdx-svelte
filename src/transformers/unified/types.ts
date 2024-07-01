import { z } from "zod"
import { ConfigSchema } from "./schema.js"

export type UnifiedTransformerConfigSchemaInput = z.input<typeof ConfigSchema>
export type UnifiedTransformerConfigSchemaOutput = z.output<typeof ConfigSchema>
