// sum.test.js
import { expect, test } from "vitest"
import {
    moduleScriptRegex,
    normalScriptRegex,
} from "../src/transformers/unified/plugins/remark-mdx-data-and-custom-elements.js"

// Svelte <= 4
test("script context module", () => {
    expect(moduleScriptRegex.test('<script context="module"></script>')).toBe(
        true,
    )
})

// Svelte >= 5
test("script module", () => {
    expect(moduleScriptRegex.test("<script module></script>")).toBe(true)
})

test("script normal", () => {
    expect(normalScriptRegex.test("<script></script>")).toBe(true)
})
