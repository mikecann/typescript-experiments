declare module "data.validation" {
  export class Validation {
    value: string[];
  }

  export const Failure: (errors: string[]) => Validation;
  export const Success: () => Validation;
}

declare module "bravent" {
  import { Validation } from "data.validation";

  // ---- Events ------ //

  type Event<TEventType extends string, TPayload extends object> = {
    [P in keyof TPayload]: TPayload[P]
  } & {
    type: TEventType;
  };

  type EventDefinitions<TEventPayload extends object> = {
    [eventName: string]: TEventPayload;
  };

  type EventFromDefinition<
    TEventDefinitions extends EventDefinitions<object>,
    T extends keyof TEventDefinitions
  > = T extends keyof TEventDefinitions
    ? T extends string
      ? Event<T, TEventDefinitions[T]>
      : never
    : never;

  type EventsInDefinition<
    TEventDefinitions extends EventDefinitions<object>
  > = EventFromDefinition<TEventDefinitions, keyof TEventDefinitions>;

  type ExtractEventDefinitions<T> = T extends AggregateClass<
    infer X,
    infer Y,
    infer Z
  >
    ? Y
    : T extends AggregateInstance<infer X, infer Y, infer Z>
    ? Y
    : never;

  type EventsFromAggregate<T> = EventsInDefinition<ExtractEventDefinitions<T>>;

  // ---- Commands ------ //

  type Command<TCommandType extends string, TPayload extends object> = {
    [P in keyof TPayload]: TPayload[P]
  } & {
    type: TCommandType;
  };

  type CommandDefinitions<TCommandPayload extends object> = {
    [eventName: string]: TCommandPayload;
  };

  type CommandFromDefinition<
    TCommandDefinitions extends CommandDefinitions<object>,
    T extends keyof TCommandDefinitions
  > = T extends keyof TCommandDefinitions
    ? T extends string
      ? Command<T, TCommandDefinitions[T]>
      : never
    : never;

  type CommandsInDefinition<
    TCommandDefinitions extends CommandDefinitions<object>
  > = CommandFromDefinition<TCommandDefinitions, keyof TCommandDefinitions>;

  type ExtractCommandDefinitions<T> = T extends AggregateClass<
    infer X,
    infer Y,
    infer Z
  >
    ? Z
    : T extends AggregateInstance<infer X, infer Y, infer Z>
    ? Z
    : never;

  type AnyCommandFromAggregate<T> = CommandsInDefinition<
    ExtractCommandDefinitions<T>
  >;

  type CommandsFromCommandClassMap<
    T extends { [key: string]: new (...args: any[]) => any }
  > = { [K in keyof T]: InstanceType<T[K]> };

  // ---- Handlers ------ //

  type CommandHandlerReturn<
    TEventDefinitions extends CommandDefinitions<object>
  > = EventsInDefinition<TEventDefinitions>[] | Validation;

  type EventHandlers<
    TState,
    TEventDefinitions extends EventDefinitions<object>
  > = {
    [P in keyof TEventDefinitions]: (
      state: TState,
      event: Event<string, TEventDefinitions[P]>
    ) => TState
  };

  type CommandHandlers<
    TState,
    TCommandDefinitions extends CommandDefinitions<object>,
    TEventDefinitions extends EventDefinitions<object>
  > = {
    [P in keyof TCommandDefinitions]: (
      state: TState,
      command: Command<string, TCommandDefinitions[P]>
    ) => CommandHandlerReturn<TEventDefinitions>
  };

  // ---- State ------ //

  type ExtractState<T> = T extends AggregateClass<infer X, infer Y, infer Z>
    ? X
    : T extends AggregateInstance<infer X, infer Y, infer Z>
    ? X
    : never;

  // ---- Aggregate ------ //

  type AnyAggregateInstance = AggregateInstance<any, any, any>;
  type AnyAggregateClass = AggregateClass<any, any, any>;

  type AggregateInstanceOf<T> = T extends AggregateClass<
    infer X,
    infer Y,
    infer Z
  >
    ? AggregateInstance<X, Y, Z>
    : never;

  type AggregateDefinition<
    TState,
    TEventDefinitions extends EventDefinitions<object>,
    TCommandDefinitions extends CommandDefinitions<object>
  > = {
    initialState?: TState;
    eventHandlers: EventHandlers<TState, TEventDefinitions>;
    commandHandlers: CommandHandlers<
      TState,
      TCommandDefinitions,
      TEventDefinitions
    >;
  };

  type OnDispatchSuccessHandlerForAggregateClass<T> = OnDispatchSuccessHandler<
    ExtractEventDefinitions<T>
  >;

  type OnDispatchSuccessHandler<
    TEventDefinitions extends EventDefinitions<object>
  > = (newEvents: EventsInDefinition<TEventDefinitions>[]) => void;

  type OnDispatchFailureHandler = (error: any) => {};

  type AggregateInstance<
    TState,
    TEventDefinitions extends EventDefinitions<object>,
    TCommandDefinitions extends CommandDefinitions<object>
  > = {
    dispatch: (
      command: CommandsInDefinition<TCommandDefinitions>,
      onSuccess?: OnDispatchSuccessHandler<TEventDefinitions>,
      onFailure?: OnDispatchFailureHandler
    ) => AggregateInstance<TState, TEventDefinitions, TCommandDefinitions>;
    state: () => TState;
  };

  type AggregateClass<
    TState,
    TEventDefinitions extends EventDefinitions<object>,
    TCommandDefinitions extends CommandDefinitions<object>
  > = {
    of: (
      events: EventsInDefinition<TEventDefinitions>[]
    ) => AggregateInstance<TState, TEventDefinitions, TCommandDefinitions>;
  };

  export function defineAggregate<
    TState,
    TEventDefinitions extends EventDefinitions<object>,
    TCommandDefinitions extends CommandDefinitions<object>
  >(
    definition: AggregateDefinition<
      TState,
      TEventDefinitions,
      TCommandDefinitions
    >
  ): AggregateClass<TState, TEventDefinitions, TCommandDefinitions>;
}
