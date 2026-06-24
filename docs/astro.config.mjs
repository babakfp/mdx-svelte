// @ts-check
import { unified } from "@astrojs/markdown-remark"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import remarkGithubAlerts from "mdx-svelte/unified/remark-github-alerts"

// TODO: https://github.com/expressive-code/expressive-code/issues/250

export default defineConfig({
    site: "https://mdx-svelte.vercel.app",
    integrations: [
        starlight({
            title: "MDX Svelte",
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/babakfp/mdx-svelte",
                },
            ],
            sidebar: [
                {
                    label: "Get Started",
                    items: [
                        {
                            label: "Intro",
                            slug: "", // "/"
                        },
                        { slug: "install" },
                        { slug: "options" },
                        { slug: "collections" },
                    ],
                },
                {
                    label: "Usage",
                    items: [
                        { slug: "frontmatter" },
                        { slug: "importing-files" },
                    ],
                },
                {
                    label: "Transformers",
                    items: [
                        {
                            label: "Intro",
                            slug: "transformers",
                        },
                        { slug: "transformers/build" },
                    ],
                },
                {
                    label: "Unified",
                    items: [
                        {
                            label: "Intro",
                            slug: "unified",
                        },
                        { slug: "unified/helpers" },
                        {
                            label: "Plugins",
                            slug: "unified/plugins",
                        },
                        { slug: "unified/add-plugins" },
                        { slug: "unified/options" },
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
                        { slug: "auto-imports" },
                    ],
                },
                { slug: "real-world-examples" },
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
        processor: unified({
            remarkPlugins: [remarkGithubAlerts],
        }),
    },
})
