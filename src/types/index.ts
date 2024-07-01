export type { Data } from "vfile"

export type PreprocessFile = {
    name: string
    content: string
}

declare module "vfile" {
    interface DataMap {
        frontmatter?: {
            layout?: string
        }
    }
}
