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

  type Event<TEventType extends string, TPayload extends object> = TPayload & {
    type: TEventType;
  };

  type EventDefinitions<TEventPayload extends object = object> = {
    [eventName: string]: TEventPayload;
  };

  type EventFromDefinition<
    TEventDefinitions extends EventDefinitions<object>,
    T extends keyof TEventDefinitions
  > = 
    T extends keyof TEventDefinitions ? 
      T extends string ? Event<T, TEventDefinitions[T]> : never
    : never;

  type EventsInDefinition<
    TEventDefinitions extends EventDefinitions<object>
  > = EventFromDefinition<TEventDefinitions, keyof TEventDefinitions>;

  // ---- Commands ------ //

  type Command<TCommandType extends string, TPayload extends object> = 
  TPayload & {
    type: TCommandType;
  };

  type CommandDefinitions<TCommandPayload extends object = object> = {
    [eventName: string]: TCommandPayload;
  };

  type CommandFromDefinition<
    TCommandDefinitions extends CommandDefinitions<object>,
    T extends keyof TCommandDefinitions
  > = T extends keyof TCommandDefinitions ? 
        T extends string ? Command<T, TCommandDefinitions[T]> : never
    : never;

  type CommandsInDefinition<TCommandDefinitions extends CommandDefinitions<object>> 
      = CommandFromDefinition<TCommandDefinitions, keyof TCommandDefinitions>;

  // ---- Handlers ------ //

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
    TCommandDefinitions extends CommandDefinitions,
    TEventDefinitions extends EventDefinitions
  > = {
    [P in keyof TCommandDefinitions]: (
      state: TState,
      command: Command<string, TCommandDefinitions[P]>
    ) => EventsInDefinition<TEventDefinitions>[] | Validation;
  };

  // ---- State ------ //

  type ExtractState<T> = 
    T extends AggregateClass<infer X, infer Y, infer Z> ? X : 
    T extends AggregateInstance<infer X, infer Y, infer Z> ? X : never;

  // ---- Aggregate ------ //

  type AggregateDefinition<
    TState,
    TEventDefinitions extends EventDefinitions,
    TCommandDefinitions extends CommandDefinitions
  > = {
    initialState?: TState;
    eventHandlers: EventHandlers<TState, TEventDefinitions>;
    commandHandlers: CommandHandlers<TState, TCommandDefinitions, TEventDefinitions>;
  };

  type AggregateInstance<
    TState,
    TEventDefinitions extends EventDefinitions,
    TCommandDefinitions extends CommandDefinitions
  > = {
    dispatch: (
      command: CommandsInDefinition<TCommandDefinitions>,
      onSuccess?: (newEvents: EventsInDefinition<TEventDefinitions>[]) => void,
      onFailure?: (error: any) => {}
    ) => AggregateInstance<TState, TEventDefinitions, TCommandDefinitions>;
    state: () => TState;
  };

  type AggregateClass<
    TState,
    TEventDefinitions extends EventDefinitions,
    TCommandDefinitions extends CommandDefinitions
  > = {
    of: (
      events: EventsInDefinition<TEventDefinitions>[]
    ) => AggregateInstance<TState, TEventDefinitions, TCommandDefinitions>;
  };

  export function defineAggregate<
    TState,
    TEventDefinitions extends EventDefinitions,
    TCommandDefinitions extends CommandDefinitions
  >(
    definition: AggregateDefinition<TState, TEventDefinitions, TCommandDefinitions>
  ): AggregateClass<TState, TEventDefinitions, TCommandDefinitions>;
}
