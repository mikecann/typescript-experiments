/**
 * Enough of that basic stuff..
 * One of the most interesting of the "advanced" typescript features is the
 * keyof keyword or "index" typing
 */

const obj = {
  propA: "foo",
  propB: 123
};

type KeysOf<T> = keyof T;

type KeysOfMyObj = KeysOf<typeof obj>;

function myFunc(key: KeysOfMyObj) {
  // note that this is a string that could be "propA" or "propB"
}
