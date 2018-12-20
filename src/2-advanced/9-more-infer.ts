// Say we have a type like:

type AFunctionThatReturns<T> = (...args: any[]) => T;

// This means we can type a function such as:

const someFunc: AFunctionThatReturns<number> = () => 123;

const someFuncNotWorking: AFunctionThatReturns<number> = () => "foo"; // not a number

// Now say we want to get the return from that function.. how do we?

type FunctionReturnType<T> = T extends AFunctionThatReturns<infer R> ? R : any;

// Cool now we can do this:

type someFuncType = FunctionReturnType<typeof  someFunc>; // number
