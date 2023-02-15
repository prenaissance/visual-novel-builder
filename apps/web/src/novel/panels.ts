import { VNPanel } from "visual-novel-builder";
import { VNState } from "./state";

export type VNData = {
  text: string;
  audioUrl?: string;
  soundEffectUrl?: string;
  bgImageUrl?: string;
};

export const panels: VNPanel<VNState, VNData>[] = [
  {
    id: "start",
    data: {
      text: "Hello, world!",
    },
    next: "end",
  },
  {
    id: "end",
    data: {
      text: "Goodbye, world!",
    },
    isFinal: true,
  },
];
