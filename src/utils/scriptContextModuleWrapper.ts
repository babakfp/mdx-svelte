export const scriptContextModuleWrapper = (inner: string) => {
    return `
        <script context="module">
            ${inner}
        </script>
    `
}
