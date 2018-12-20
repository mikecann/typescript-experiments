// Infer lets you get the type of a generic parameter...

type GetArrayType<T> = T extends (infer P)[] ? P : never;

function mustBeArray<T>(o: T): GetArrayType<T> {
  return o as any;
}

const ret = mustBeArray("sdfdsf"); // never because its not an array
const ret2 = mustBeArray(["foo", "bar"]); // string because we have inferred the type of the array

