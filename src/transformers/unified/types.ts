import { z } from "zod"
import { unifiedTransformerSchema } from "./schema.js"

export type UnifiedTransformerOptionsInput = z.input<
    typeof unifiedTransformerSchema
>
export type UnifiedTransformerOptionsOutput = z.output<
    typeof unifiedTransformerSchema
>
