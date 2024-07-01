import type { Data } from "vfile"

export const replaceMdxDataPlaceholderWithData = (html: string, data: Data) => {
    return html.replace("__mdxData__", JSON.stringify(data))
}
