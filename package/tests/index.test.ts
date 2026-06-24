import { expect, it, test } from "vitest"
import { mdxPreprocess } from "../src/mdxPreprocess/index.js"
import {
    moduleScriptRegex,
    normalScriptRegex,
} from "../src/transformers/unified/plugins/remark-mdx-data-and-custom-elements.js"

test("Logic Blocks", async () => {
    const input = "{@render MyComponent()}"
    const output = (await mdxPreprocess().markup({ content: input }))?.code
    expect(output).toContain(input)
})

// ---

test("Regular Expression | <script>", () => {
    expect(normalScriptRegex.test("<script></script>")).toBe(true)
})

it("Regular Expression | <script>", () => {
    const match = "<script></script>".match(normalScriptRegex)
    expect(match?.[1]).toBe("<script>")
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})

test("Regular Expression | Svelte 5 | <script module>", () => {
    expect(moduleScriptRegex.test("<script module></script>")).toBe(true)
})

it("Regular Expression | Svelte 5 | <script module>", () => {
    const match = "<script module></script>".match(moduleScriptRegex)
    expect(match?.[1]).toBe("<script module>")
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})

// TODO: Remove when Svelte 4 syntax gets depreciated.

test('Regular Expression | Svelte 4 | <script context="module">', () => {
    const input = '<script context="module"></script>'
    expect(moduleScriptRegex.test(input)).toBe(true)
})

it('Regular Expression | Svelte 4 | <script context="module">', () => {
    const input = '<script context="module"></script>'
    const match = input.match(moduleScriptRegex)
    expect(match?.[1]).toBe('<script context="module">')
    expect(match?.[3]).toBe("")
    expect(match?.[4]).toBe("</script>")
})
