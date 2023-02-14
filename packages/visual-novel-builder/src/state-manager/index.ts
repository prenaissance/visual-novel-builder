import {
  FlexibleParameter,
  getFlexibleParameterHandler,
} from "../common/flexible-parameter";

export function createStore<StateT>(initialState: StateT) {
  const handleFlexibleParameter =
    getFlexibleParameterHandler<StateT>(initialState);

  let state = initialState;

  return {
    getSnapshot: () => state,
    setState: (stateSetter: FlexibleParameter<StateT, StateT>) => {
      state = handleFlexibleParameter(stateSetter);
    },
  };
}
