/** You can modify this interface based on your needs. Whatever you pass here, will be wrapped with {@link Partial}. */
export interface MarkdownData {
    // NOTE: This `frontmatter` will always be available unless related plugin are disabled.
    frontmatter?: {
        layout?: string
        [key: string]: unknown
    }
}

declare module "vfile" {
    interface DataMap extends MarkdownData {}
}
