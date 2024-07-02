import { fromHtml } from "hast-util-from-html"

export const hastFromHtml = (html: string) => {
    return fromHtml(html, {
        fragment: true,
    }).children
}
