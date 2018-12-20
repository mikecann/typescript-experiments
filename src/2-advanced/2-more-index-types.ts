// We can use keyof as an index into another type;

type StringAsKeys<T> = { [P in keyof T]: string };

function returnObjectWithSameKeysButWithValuesAsStrings<T>(
  obj: T
): StringAsKeys<T> {
  return {} as any; // some implementation
 }

const stringObj = returnObjectWithSameKeysButWithValuesAsStrings(obj);
type x = typeof stringObj;

// Thats pretty handy, but keyof can do so much more..
