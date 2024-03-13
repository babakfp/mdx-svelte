export const isHrefExternal = (href: string | undefined) => {
    if (!href) return false
    return href.startsWith("http://") || href.startsWith("https://")
}
