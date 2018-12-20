// you can interrogate the type of a variable at compile time:

const myComplexObj = {
  foo: "bar",
  age: 123
};

type MyComplexObjectType = typeof myComplexObj;