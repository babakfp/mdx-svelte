export type { Data } from "vfile"

declare module "vfile" {
    interface DataMap {
        frontmatter?: {}
    }
}
