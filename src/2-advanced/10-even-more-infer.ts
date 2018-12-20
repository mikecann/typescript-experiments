// Given the following type we can infer a number of things

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T10 = Unpacked<string>; // string
type T11 = Unpacked<string[]>; // string
type T12 = Unpacked<() => string>; // string
type T13 = Unpacked<Promise<string>>; // string
type T14 = Unpacked<Promise<string>[]>; // Promise<string>
type T15 = Unpacked<Unpacked<Promise<string>[]>>; // string

// Unions with infer work too

type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type T16 = Foo<{ a: string; b: string }>; // string
type T17 = Foo<{ a: string; b: number }>; // string | number
