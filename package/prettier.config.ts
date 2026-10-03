import type { PluginConfig as SortImports } from "@ianvs/prettier-plugin-sort-imports"
import type { Config as Prettier } from "prettier"

export default {
    semi: false,
    tabWidth: 4,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
} satisfies Prettier & SortImports
