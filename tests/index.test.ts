import { expect, it, test } from "vitest"
import { mdxPreprocess } from "../src/mdxPreprocess/index.js"
import {
    moduleScriptRegex,
    normalScriptRegex,
} from "../src/transformers/unified/plugins/remark-mdx-data-and-custom-elements.js"

test("{@render", async () => {
    const input =
        "and the `{@render MyComponent()}` syntax for type `Snippet` type"
    const output = (await mdxPreprocess().markup({ content: input }))?.code
    const expectedOutput =
        '<script context="module">\n' +
        "    export const mdx = {};\n" +
        "    export const frontmatter = mdx.frontmatter;\n" +
        "</script>\n" +
        "<script>\n" +
        '    import { getContext as getContext_ } from "svelte";\n' +
        '    const MdxElements = getContext_("mdxElements") ?? {};\n' +
        "</script>\n" +
        "<p>and the <code>&#x7B;@render MyComponent()&#x7D;</code> syntax for type <code>Snippet</code> type</p>"
    expect(output).toBe(expectedOutput)
})

// script context module

test("(svelte <= 4): script context module", () => {
    expect(moduleScriptRegex.test('<script context="module"></script>')).toBe(
        true,
    )
})

it("(svelte <= 4): script context module", () => {
    const match = '<script context="module"></script>'.match(moduleScriptRegex)
    expect(match?.[1]).toBe('<script context="module">')
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})

// script module

test("(svelte >= 5): script module", () => {
    expect(moduleScriptRegex.test("<script module></script>")).toBe(true)
})

it("(svelte >= 5): script module", () => {
    const match = "<script module></script>".match(moduleScriptRegex)
    expect(match?.[1]).toBe("<script module>")
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})

// script normal

test("script normal", () => {
    expect(normalScriptRegex.test("<script></script>")).toBe(true)
})

it("script normal", () => {
    const match = "<script></script>".match(normalScriptRegex)
    expect(match?.[1]).toBe("<script>")
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})
