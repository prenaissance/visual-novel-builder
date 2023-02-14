import { getFlexibleParameterHandler } from "../common/flexible-parameter";
import { createStore } from "../state-manager";
import { BranchPanel, FinalPanel, ImmediatePanel, VNPanel } from "./panels";

export const createVisualNovel = <StateT, DataT>(
  initialId: string,
  initialState: StateT,
  panels: VNPanel<StateT, DataT>[]
) => {
  const panelMap = new Map<string, VNPanel<StateT, DataT>>();
  panels.forEach((state) => panelMap.set(state.id, state));
  const store = createStore(initialState);

  const resolveImmediatePanel = (panel: ImmediatePanel<StateT, DataT>) => {
    const { id, data, next, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    onEnter && store.setState(onEnter);

    return {
      id,
      data: handleFlexibleParameter(data),
      next: handleFlexibleParameter(next),
      onEnter: onEnter,
    } as ImmediatePanel<StateT, DataT>;
  };

  const resolveBranchPanel = (panel: BranchPanel<StateT, DataT>) => {
    const { id, data, choices, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    onEnter && store.setState(onEnter);

    return {
      id,
      data: handleFlexibleParameter(data),
      choices: handleFlexibleParameter(choices),
      onEnter: onEnter,
    } as BranchPanel<StateT, DataT>;
  };

  const resolveFinalPanel = (panel: FinalPanel<StateT, DataT>) => {
    const { id, data, onEnter } = panel;
    const handleFlexibleParameter = getFlexibleParameterHandler(
      store.getSnapshot()
    );

    onEnter && store.setState(onEnter);

    return {
      id,
      data: handleFlexibleParameter(data),
      onEnter: onEnter,
      isFinal: true,
    } as FinalPanel<StateT, DataT>;
  };

  const resolvePanel = (id: string): VNPanel<StateT, DataT> => {
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

  return {
    getSnapshot: store.getSnapshot,
    intialPanel: currentPanel,
    onTransition: (panelId: string) => {
      currentPanel = resolvePanel(panelId);
    },
    getCurrentPanel: () => currentPanel,
  };
};
