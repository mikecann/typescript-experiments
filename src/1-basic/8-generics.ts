// We can declare generic types

type Payload<T> = {
  value: T
}

const stringPaylod: Payload<string> = {
  value: "foo"
}

const numberPaylod: Payload<number> = {
  value: "foo" // must be a number
}





// We can add type-constraints to generics

type Payload2<T extends { a: string }> = {
  value: T
}

const objA = {
  a: "foo"
}

const objB = {
  b: "foo"
}

type FooPayload = Payload2<typeof objA>; // okay
type BarPayload = Payload2<typeof objB>; // not okay






// We can even go defaults for generic types

type Payload3<T, U = string> = {
  a: T,
  b: U
}

// So all of these are okay

type MyStringString =  Payload3<string, string>;
type MyStringString2 =  Payload3<string>;
type MyStringString3 =  Payload3<string, number>;
