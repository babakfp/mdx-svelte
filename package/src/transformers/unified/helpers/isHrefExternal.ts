export const isHrefExternal = (href: string) => {
    return href.startsWith("http://") || href.startsWith("https://")
}
