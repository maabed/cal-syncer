export type NonNullableField<T> = { [P in keyof T]-?: NonNullableField<NonNullable<T[P]>> };
