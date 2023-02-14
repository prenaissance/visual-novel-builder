export type FactoryFunction<StateT, ParameterT> = (state: StateT) => ParameterT;
export type FlexibleParameter<StateT, ParameterT> =
  | ParameterT
  | FactoryFunction<StateT, ParameterT>;

export const getFlexibleParameterHandler =
  <StateT>(state: StateT) =>
  <ParameterT>(parameter: FlexibleParameter<StateT, ParameterT>) => {
    if (typeof parameter === "function") {
      return (parameter as FactoryFunction<StateT, ParameterT>)(state);
    }
    return parameter;
  };
