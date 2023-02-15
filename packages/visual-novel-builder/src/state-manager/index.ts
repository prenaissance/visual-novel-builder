import {
  FlexibleParameter,
  getFlexibleParameterHandler,
} from "../common/flexible-parameter";

export function createStore<StateT>(initialState: StateT) {
  const handleFlexibleParameter =
    getFlexibleParameterHandler<StateT>(initialState);

  let state = initialState;
  const subscribers = new Set<(state: StateT) => void>();

  return {
    subscribe: (subscriber: (state: StateT) => void) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    getSnapshot: () => state,
    setState: (stateSetter: FlexibleParameter<StateT, StateT>) => {
      state = handleFlexibleParameter(stateSetter);
      subscribers.forEach((subscriber) => subscriber(state));
    },
  };
}
