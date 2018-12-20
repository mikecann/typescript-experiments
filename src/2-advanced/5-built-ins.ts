// Typescript has a bunch of other built in handy types too

const exampleObj = {
  propA: "foo",
  propB: 123,
  propC: true
};

const readonlyObj: Readonly<typeof exampleObj>;
type readonlyObjType = typeof readonlyObj;

const partialObj: Partial<typeof exampleObj>;
type partialObjType = typeof partialObj;

const requiredObj: Required<partialObjType>;
type requiredType = typeof requiredObj;

// What is this wierd -? syntax? hmmm....

type ReadWrite<T> = { -readonly [P in keyof T]: T[P] };

const readwriteableObj: ReadWrite<readonlyObjType>;
type readwriteableObjType = typeof readwriteableObj;

// Interesting!
