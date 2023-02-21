import { VNPanel } from "visual-novel-builder";
import { VNState } from "./state";

export type VNData = {
  author?: string;
  text: string;
  audioUrl?: string;
  soundEffectUrl?: string;
  bgImageUrl?: string;
};

export const panels: VNPanel<VNState, VNData>[] = [
  {
    id: "start",
    data: {
      text: "Another day, another dollar. It's finally Friday. Time to go to work and finish up this project.",
      bgImageUrl: "/images/wake-up.png",
    },
    next: "start:insight",
  },
  {
    id: "start:insight",
    data: {
      text: "Things have been going well lately. I think I'm getting in a good place in life, however I still need the extra cash to reach my goals.",
    },
    next: "start:transport",
  },
  {
    id: "start:transport",
    data: {
      text: "However I am still very tired from the week! Should I walk to work or sleep in and take a taxi?",
    },
    choices: [
      {
        text: "Walk",
        next: "walk-to-work",
      },
      {
        text: "Taxi",
        next: "taxi-to-work",
      },
    ],
  },
  {
    id: "taxi-to-work",
    data: {
      text: "Guess I'll sleep a bit more...",
    },
    onEnter: (state) => {
      return {
        ...state,
        isSleepy: true,
      };
    },
    next: "office",
  },
  {
    id: "walk-to-work",
    data: {
      text: "I'm feeling good today. I'll walk to work.",
    },
    next: "walk-to-work:walk",
  },
  {
    id: "walk-to-work:walk",
    data: {
      text: "It's a beautiful day. The sun is shining and the birds are chirping. I'm glad I choice to go by foot to the office. Can't wait to get there!",
      bgImageUrl: "/images/walk-to-work.png",
    },
    next: "office",
  },
  {
    id: "office",
    data: {
      text: "Finally made it to the office. Today is a big day.",
      bgImageUrl: "/images/office-entrance.png",
    },
    next: ({ isSleepy }) => (isSleepy ? "office:sleepy" : "office:entering"),
  },
  {
    id: "office:sleepy",
    data: {
      text: "Although I took a taxi, I slept in a bit. I'm late to work!",
    },
    next: "office:entering",
  },
  {
    id: "office:entering",
    data: {
      text: "I should visit my boss. He told me he has something to discuss.",
    },
    next: "office:boss",
  },
  {
    id: "office:boss",
    data: {
      text: "Good morning. Today is the big day, hope you're ready to make the deal.",
      author: "Boss",
      bgImageUrl: "/images/discussing-boss.png",
    },
    choices: [
      {
        text: "Yeah, sure!",
        next: "office:boss:yes",
      },
      {
        text: "I'm not sure...",
        next: "office:boss:no",
      },
    ],
  },
  {
    id: "office:boss:yes",
    data: {
      text: "Great! You and Patrick have done a great job. I'm sure the client will not have second thoughts.",
      author: "Boss",
    },
    next: "office:boss:next-project",
  },
  {
    id: "office:boss:no",
    data: {
      text: "Hah, nice joke! With the work you and Patrick have done, talking with the client is just a formality. You'll be fine.",
      author: "Boss",
    },
    next: "office:boss:next-project",
  },
  {
    id: "office:boss:next-project",
    data: {
      text: "I have another project for your team. It's a bit more complex, as the client doesn't 'know' that he wants a deal with us. We will have to find a way to make him find us. I'll let you know more next week.",
      author: "Boss",
    },
    next: "office:boss:remark",
  },
  {
    id: "office:boss:remark",
    data: ({ isSleepy }) => ({
      text: isSleepy
        ? "Oh, and please do not come late again. You're the most important member of the team!"
        : "And by the way, I'm very happy with your results.",
    }),
    next: "office:patrick",
  },
  {
    id: "end",
    data: {
      text: "Goodbye, world!",
    },
    isFinal: true,
  },
];
