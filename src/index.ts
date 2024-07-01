import type { Data } from "vfile"

export * from "./helpers/constants.js"
export * from "./helpers/makeToc.js"
export * from "./mdxPreprocess/index.js"
export type * from "./types/index.js"

declare module "vfile" {
    interface DataMap {
        frontmatter?: {
            layout?: string
        }
    }
}

export type { Data }
