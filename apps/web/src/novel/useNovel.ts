import { use, useEffect, useRef, useState } from "react";
import { createVisualNovel, VNPanel } from "visual-novel-builder";
import { panels, VNData } from "./panels";
import { initialState, VNState } from "./state";

const useNovel = () => {
  const novelRef = useRef(
    createVisualNovel({
      initialId: "start",
      initialState,
      panels,
    })
  );
  const [panel, setPanel] = useState<VNPanel<VNState, VNData>>(
    novelRef.current.getCurrentPanel
  );

  useEffect(() => {
    const unsubscribe = novelRef.current.subscribe(setPanel);
    return unsubscribe;
  }, []);

  return {
    panel,
    novel: novelRef.current,
  };
};
export default useNovel;
