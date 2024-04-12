import * as v from "valibot"

import { ConfigSchema } from "../schemas/index.js"

export type ConfigInput = v.Input<typeof ConfigSchema>
export type ConfigOutput = v.Output<typeof ConfigSchema>
