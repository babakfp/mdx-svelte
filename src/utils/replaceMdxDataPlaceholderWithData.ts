import type { Data } from "vfile"

export const replaceMdxDataPlaceholderWithData = (
    content: string,
    data: Data,
) => {
    return content.replace("__mdxData__", JSON.stringify(data))
}
