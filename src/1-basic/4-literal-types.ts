// You can have literal types

let justFoo: "foo" = "foo";

justFoo = "bar"; // nope beacuse "bar" is not literally "foo"

// This is really handy for "states" of things

type State = "NOT_STARTED" | "STARTING" | "STARTED";

const state: State = "EXPLODED";