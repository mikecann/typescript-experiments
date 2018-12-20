// Given an object

const pickMe = {
  propA: "foo",
  propB: 123,
  propC: true
};

// Say we only want "propA" and "propC" we can write the following to
// do this in a typesafe way

function pick<T, K extends keyof T>(o: T, names: K[]): { [P in K]: T[P] } {
  return names.reduce(
    (accum, curr) => ({ ...accum, [curr]: o[curr] }),
    {}
  ) as any;
}

let strings = pick(pickMe, ["propA", "propC"]);

// Sweet!
