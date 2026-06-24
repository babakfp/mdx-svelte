export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

export type Spread<TParent, TChildren extends Record<string, object>> = {
    [K in keyof TChildren]: TParent & TChildren[K]
}
