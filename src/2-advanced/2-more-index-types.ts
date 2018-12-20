// Using keyof to return an object with the same keys as a given object

type StringAsKeys<T> = { [P in keyof T]: string };

function returnObjectWithSameKeysButWithValuesAsStrings<T>(
  obj: T
): StringAsKeys<T> {
  // const newObj: any = {};
  // for (var key in obj) newObj[key] = JSON.stringify(obj[key]);
  // return newObj;
}

const stringObj = returnObjectWithSameKeysButWithValuesAsStrings(obj);
type x = typeof stringObj;

// Thats pretty handy, but keyof can do so much more..
