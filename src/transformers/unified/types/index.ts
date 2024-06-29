import { z } from "zod"

import { ConfigSchema } from "../schemas/index.js"

export type ConfigInput = z.input<typeof ConfigSchema>
export type ConfigOutput = z.output<typeof ConfigSchema>
