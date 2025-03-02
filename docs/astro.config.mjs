// @ts-check
import starlight from "@astrojs/starlight"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import remarkGithubAlerts from "../package/src/transformers/unified/plugins/remark-github-alerts/src/index.ts"

// TODO: https://github.com/expressive-code/expressive-code/issues/250

export default defineConfig({
    integrations: [
        starlight({
            title: "MDX Svelte",
            social: {
                github: "https://github.com/babakfp/mdx-svelte",
            },
            sidebar: [
                {
                    label: "Get Started",
                    items: [
                        {
                            label: "Intro",
                            slug: "", // "/"
                        },
                        {
                            label: "Install",
                            slug: "install",
                        },
                        {
                            label: "Options",
                            slug: "options",
                        },
                        {
                            label: "Collections",
                            slug: "collections",
                        },
                    ],
                },
                {
                    label: "Transformers",
                    items: [
                        {
                            label: "Intro",
                            slug: "transformers",
                        },
                        {
                            label: "Build a Transformer",
                            slug: "transformers/build",
                        },
                    ],
                },
                {
                    label: "Unified",
                    items: [
                        {
                            label: "Intro",
                            slug: "unified",
                        },
                        {
                            label: "Helpers",
                            slug: "unified/helpers",
                        },
                        {
                            label: "Plugins",
                            slug: "unified/plugins",
                        },
                        {
                            label: "Add plugin",
                            slug: "unified/add-plugin",
                        },
                        {
                            label: "Options",
                            slug: "unified/options",
                        },
                    ],
                },
                {
                    label: "Advanced",
                    items: [
                        {
                            label: "Table of Contents",
                            slug: "table-of-contents",
                        },
                        {
                            label: "Customize Elements",
                            slug: "customize-markdown-elements",
                        },
                        {
                            label: "Auto-Imports",
                            slug: "auto-imports",
                        },
                    ],
                },
                {
                    label: "Real-world Examples",
                    slug: "real-world-examples",
                },
                {
                    slug: "changelog",
                },
            ],
            customCss: [
                "@fontsource-variable/jost",
                "@fontsource-variable/jetbrains-mono",
                "./src/styles/global.css",
                "mdx-svelte/unified/remark-github-alerts/github-base.css",
                "mdx-svelte/unified/remark-github-alerts/github-colors-dark.css",
                "./src/styles/remark-github-alerts.css",
            ],
            components: {
                ThemeSelect: "./src/components/ThemeSelect.astro",
                ThemeProvider: "./src/components/ThemeProvider.astro",
            },
            editLink: {
                baseUrl:
                    "https://github.com/babakfp/mdx-svelte/edit/main/package",
            },
            lastUpdated: true,
        }),
    ],
    markdown: {
        remarkPlugins: [[remarkGithubAlerts, []]],
    },
    vite: {
        plugins: [tailwindcss()],
    },
})
