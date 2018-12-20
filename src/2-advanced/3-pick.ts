// Okay Quiz time... 

// Given an object

const pickMe = {
  propA: "foo",
  propB: 123,
  propC: true
};

// How do we "type" as function that given and object and an array of strings,
// it returns just the props defined in the array?

/*
function pick(obj, names) {
  return // just the props of "obj" that are listed in "names"
}

let picked = pick(pickMe, ["propA", "propC"]); // should be an object with "propA" and "propC" only
*/


















































// Say we only want "propA" and "propC" we can write the following to
// do this in a typesafe way

function pick2<T, K extends keyof T>(o: T, names: K[]): { [P in K]: T[P] } {
  throw "Not Implemented";
}

let picked2 = pick2(pickMe, ["propA", "propC"]);

// Sweet!
