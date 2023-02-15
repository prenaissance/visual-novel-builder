import { getFlexibleParameterHandler } from "../common/flexible-parameter";
import { createStore } from "../state-manager";
import {
  BranchPanel,
  FinalPanel,
  ImmediatePanel,
  ProcessedBranchPanel,
  ProcessedFinalPanel,
  ProcessedImmediatePanel,
  ProcessedVNPanel,
  VNPanel,
} from "./panels";

export const createVisualNovel = <StateT, DataT>(
  initialId: string,
  initialState: StateT,
  panels: VNPanel<StateT, DataT>[]
) => {
  const panelMap = new Map<string, VNPanel<StateT, DataT>>();
  panels.forEach((state) => panelMap.set(state.id, state));
  const store = createStore(initialState);
  const subscribers = new Set<(panel: VNPanel<StateT, DataT>) => void>();

  const resolveImmediatePanel = (
    panel: ImmediatePanel<StateT, DataT>
  ): ProcessedImmediatePanel<StateT, DataT> => {
    const { id, data, next, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    return {
      id,
      data: handleFlexibleParameter(data),
      next: handleFlexibleParameter(next),
      onEnter: onEnter,
    };
  };

  const resolveBranchPanel = (
    panel: BranchPanel<StateT, DataT>
  ): ProcessedBranchPanel<StateT, DataT> => {
    const { id, data, choices, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    return {
      id,
      data: handleFlexibleParameter(data),
      choices: handleFlexibleParameter(choices),
    };
  };

  const resolveFinalPanel = (
    panel: FinalPanel<StateT, DataT>
  ): ProcessedFinalPanel<StateT, DataT> => {
    const { id, data, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    return {
      id,
      data: handleFlexibleParameter(data),
      onEnter: onEnter,
      isFinal: true,
    };
  };

  const resolvePanel = (id: string): ProcessedVNPanel<StateT, DataT> => {
    const rawPanel = panelMap.get(id);
    if (!rawPanel) {
      throw new Error(`Panel with id ${id} not found`);
    }

    if ("next" in rawPanel) {
      return resolveImmediatePanel(rawPanel);
    }
    if ("choices" in rawPanel) {
      return resolveBranchPanel(rawPanel);
    }
    if ("isFinal" in rawPanel) {
      return resolveFinalPanel(rawPanel);
    }
    throw new Error(`Panel with id ${id} is not a valid panel`);
  };

  let currentPanel = resolvePanel(initialId);

  const transition = (nextId: string) => {
    if ("choices" in currentPanel) {
      const choice = currentPanel.choices.find(
        (choice) => choice.next === nextId
      );
      if (!choice) {
        throw new Error(
          `Choice with next id ${nextId} not found in panel ${currentPanel.id}`
        );
      }
      choice.onChoose && store.setState(choice.onChoose);
    }
    currentPanel = resolvePanel(nextId);
    currentPanel.onEnter && store.setState(currentPanel.onEnter);
    subscribers.forEach((subscriber) => subscriber(currentPanel));
  };

  return {
    subscribe: (subscriber: (panel: VNPanel<StateT, DataT>) => void) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    getStoreSnapshot: store.getSnapshot,
    subscribeStore: store.subscribe,
    initialPanel: currentPanel,
    getCurrentPanel: () => currentPanel,
  };
};
