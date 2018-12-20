/**
 * Enough of that basic stuff..
 * One of the most interesting of the "advanced" typescript features is the
 * keyof keyword or "index" typing
 */

// Okay suppose we have the following type that represents an object

interface AMap<T> {
  [key: string]: T;
}

// We could make one like this

const myMap: AMap<number> = {
  hello: 123,
  world: 456,
  45: "Df" // not allowed because it has to be a string key
}

// We can get the key type using a keyodf operator

let mapKeys: keyof AMap<number>; // string
let value: AMap<number>['foo']; // number


// Say we have the following object

const obj = {
  propA: "foo",
  propB: 123
};

// Its type is

type objType = typeof obj;

// We can get the "type of the keys" of that object at compile time with

type keysOfObject = keyof objType

// The true power od this comes in when we brinf generic into the mix

type KeysOf<T> = keyof T;

// Now we can represent the keys returned form something
function myFunc<T>(o: T): KeysOf<T>[] {
  return "" as any; // some implementation
}

const keys = myFunc(obj);
