import {
  FactoryFunction,
  FlexibleParameter,
} from "../common/flexible-parameter";

export type ImmediatePanel<StateT, DataT> = {
  id: string;
  data?: FlexibleParameter<StateT, DataT>;
  onEnter?: FactoryFunction<StateT, StateT>;
  next: FlexibleParameter<StateT, string>;
};

export type BranchPanel<StateT, DataT> = {
  id: string;
  data?: FlexibleParameter<StateT, DataT>;
  onEnter?: FactoryFunction<StateT, StateT>;
  choices: FlexibleParameter<
    StateT,
    {
      text: string;
      next: string;
      onChoose?: FactoryFunction<StateT, StateT>;
    }[]
  >;
};

export type FinalPanel<StateT, DataT> = {
  id: string;
  data?: FlexibleParameter<StateT, DataT>;
  onEnter?: FactoryFunction<StateT, StateT>;
  isFinal: true; // Extra safety when defining + discriminator
};

export type VNPanel<StateT, DataT> =
  | ImmediatePanel<StateT, DataT>
  | BranchPanel<StateT, DataT>
  | FinalPanel<StateT, DataT>;
