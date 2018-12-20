// You can "union" types

type UnionA = {
  propA: string;
  propC: boolean;
};

// Note: using interface here to show that you can use either interface
// or type alias, they are pretty much the same thing
interface UnionB {
  propB: number;
  propC: boolean;
}

type MyUnionType = UnionA | UnionB;

const myUnionVar: MyUnionType = {
  propA: "foo",
  propB: 123,
  propC: true,
  propD: "blah"
};