import * as v from "valibot"

import type { Options as RemarkParseOptions } from "remark-parse"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

import { DEFAULT_EXTENSIONS } from "./constants.js"

export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems`.
     * @param options - Options for the file preprocessing.
     * @param options.content - The content of the file.
     * @param options.filename - The name of the file.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (options: { content: string; filename: string }) => boolean
}

export const ConfigSchema = v.optional(
    v.object({
        extensions: v.optional(
            v.array(
                v.string([
                    v.minLength(1),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        `Invalid file extension! Valid examples: ${JSON.stringify(
                            DEFAULT_EXTENSIONS
                        )}.`
                    ),
                ]),
                [v.minLength(1)]
            ),
            DEFAULT_EXTENSIONS
        ),
        allowNodeModules: v.optional(v.boolean(), false),
        allowNodeModulesItems: v.optional(
            v.array(v.string([v.minLength(1)])),
            []
        ),
        builtInPlugins: v.optional(
            v.object({
                remarkParse: v.optional(v.object({}), {}),
                remarkGfm: v.optional(
                    v.object({
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),
                remarkUnwrapImages: v.optional(
                    v.object({
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),
                remarkRehype: v.optional(v.object({}), {}),
                rehypeShiki: v.optional(
                    v.object({
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),
                /**
                 * Sets the `target` and `rel` attributes for hyperlinks with "https://" or "http://" in the href:
                 * - Sets `target` to `"_blank"`.
                 * - Sets `rel` to `"nofollow noopener noreferrer"`.
                 */
                rehypeExternalLinks: v.optional(
                    v.object({
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),
                rehypeStringify: v.optional(v.object({}), {}),
            }),
            {}
        ),
    }),
    {}
)

// Some options are omitted because they are required and should not be disabled.
type OmittedRemarkRehypeOptions = Omit<
    RemarkRehypeOptions,
    "allowDangerousHtml"
>

// Some options are omitted because they are required and should not be disabled.
type OmittedRehypeStringifyOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>

// NOTE: Generating Valibot schema with TypeScript types is impossible. https://github.com/fabian-hiller/valibot/discussions/477
export type ConfigInput = v.Input<typeof ConfigSchema> & {
    builtInPlugins?: {
        remarkParse?: {
            options?: RemarkParseOptions
        }
        remarkGfm?: {
            options?: RemarkGfmOptions
        }
        remarkRehype?: {
            options?: OmittedRemarkRehypeOptions
        }
        rehypeShiki?: {
            options?: RehypeShikiOptions
        }
        rehypeExternalLinks?: {
            options?: RehypeExternalLinksOptions
        }
        rehypeStringify?: {
            options?: OmittedRehypeStringifyOptions
        }
    }
}
// NOTE: Generating Valibot schema with TypeScript types is impossible. https://github.com/fabian-hiller/valibot/discussions/477
export type ConfigOutput = v.Output<typeof ConfigSchema> & {
    builtInPlugins: {
        remarkParse: {
            options?: RemarkParseOptions
        }
        remarkGfm: {
            options?: RemarkGfmOptions
        }
        remarkRehype: {
            options?: OmittedRemarkRehypeOptions
        }
        rehypeShiki: {
            options?: RehypeShikiOptions
        }
        rehypeExternalLinks: {
            options?: RehypeExternalLinksOptions
        }
        rehypeStringify: {
            options?: OmittedRehypeStringifyOptions
        }
    }
}
