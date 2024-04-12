import type { MarkupPreprocessor } from "svelte/compiler"

/** Svelte markup preprocessor options. */
export type MarkupPreprocessorOptions = Parameters<MarkupPreprocessor>[0]
