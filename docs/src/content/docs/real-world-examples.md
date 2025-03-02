---
title: Real-world Examples
---

## babakfp.ir

This site is built using the MDX Svelte library. You can check out the source code to see how it works.

https://github.com/babakfp/babakfp.ir

### How it works

#### `elements` option

The `mdxPreprocess` function has an `elements` option, which lets you replace markdown elements with custom components. Here's how this site uses it:

```js
{
    elements: ["blockquote", "img", "pre"]
}
```

##### `blockquote` tag

The `blockquote` tag is replaced with a custom Svelte component. This adds custom styling and an icon at the top left corner. Example:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.

##### `img` tag

The `img` tag is replaced with a custom Svelte component. This adds `loading="lazy"` and a button to open the image in a new tab. Example:

![A screenshot showing owner of a repo saying 'Thank you!' for a PR, and I reacted with a heart emoji](/content/posts/i-like-svelte-but-i-hate-it/14.png)

##### `pre` tag

The `pre` tag is replaced with a custom Svelte component. This adds a copy button. Example:

```js
console.log("Hover to see the copy button!")
```

#### Unified transformer

##### `makeToc` function

The built-in `remarkToc` plugin is disabled, replaced with the `makeToc` function.

```js
{
    remarkToc: {
        enable: false,
    },
}
```

A custom `getHeadings` function uses `makeToc` to extract headings from the `.article-content` container.

```ts
import { makeToc } from "mdx-svelte"

export type Headings = {
    id: string
    level: number
    textContent: string
}[]

export const getHeadings = () =>
    makeToc({
        container: ".article-content",
        headingLevels: [2, 3, 4, 5, 6],
    })?.map((heading) => ({
        id: heading.attributes.id ?? "",
        level: Number(heading.level),
        textContent: heading.textContent,
    })) satisfies Headings
```

##### `rehypeAutolinkHeadings` plugin

The `rehypeAutolinkHeadings` plugin is customized to add a permalink icon to headings. It also adds an `aria-label` to the anchor tag, a `class` to the permalink icon, and excludes the `h1` heading.

```ts
{
    rehypeAutolinkHeadings: {
        enable: true,
        options: {
            behavior: "append",
            properties: {
                class: "heading-permalink",
                "aria-label": "Permalink to this headline",
            },
            content() {
                return hastFromHtml(
                    '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M216 152h-48v-48h48a8 8 0 0 0 0-16h-48V40a8 8 0 0 0-16 0v48h-48V40a8 8 0 0 0-16 0v48H40a8 8 0 0 0 0 16h48v48H40a8 8 0 0 0 0 16h48v48a8 8 0 0 0 16 0v-48h48v48a8 8 0 0 0 16 0v-48h48a8 8 0 0 0 0-16Zm-112 0v-48h48v48Z"/></svg>',
                )
            },
            test: ["h2", "h3", "h4", "h5", "h6"],
        },
    },
}
```
