// You can "intersect" types together

type IntersectA = {
  propA: string;
  propC: boolean;
};

// Note: using interface here to show that you can use either interface
// or type alias, they are pretty much the same thing
interface IntersectB {
  propB: number;
  propC: boolean;
}

type MyIntersectionType = IntersectA & IntersectB;

const myIntersectionVar: MyIntersectionType = {
  propA: "foo",
  propB: 123,
  propC: true
};
