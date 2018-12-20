import { defineAggregate, ExtractState } from "bravent";

export type State = {
  count: number
};

export type Commands = {
  increment: { }
  decrement: { }
  reset: { to: number }
}

export type Events = {
  incremented: Commands["increment"];
  decremented: Commands["decrement"];
  reset: Commands["reset"];
};

export const Counter = defineAggregate<State, Events, Commands>({
  initialState: {
    count: 0
  },

  commandHandlers: {
    increment: (state, command) => [{ type: "incremented"  }],
    decrement: (state, command) => [{ type: "decremented" }],
    reset: (state, command) => [{ type: "reset", to: command.to }],
  },

  eventHandlers: {
    incremented: (state, event) => ({
      ...state,
      count: state.count +1
    }),

    decremented: (state, event) => ({
      ...state,
      count: state.count -1
    }),

    reset: (state, event) => ({
      ...state,
      count: event.to
    }),
  }
});

const counter = Counter.of([{ type: "reset", to: 10 }]);
counter.dispatch({ type: "increment" }).state() // { count: 11  }

type InferredStateOfUser = ExtractState<typeof counter>;
type InferredStateOfUser2 = ExtractState<typeof Counter>;