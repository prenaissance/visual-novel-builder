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
      text: "Good morning. Thanks for bringing this case to completion. Hope you're ready to make the deal today.",
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
    id: "office:patrick",
    data: {
      text: "Morning pal. How are you doing?",
      author: "Patrick",
      bgImageUrl: "/images/bateman-office.png",
    },
    next: "office:patrick:nothing-much",
  },
  {
    id: "office:patrick:nothing-much",
    data: {
      text: "Nothing much. Just excited for signing off the deal today. What is our ROI? 50%? 70%?",
    },
    next: "office:patrick:roi",
  },
  {
    id: "office:patrick:roi",
    data: {
      text: "I think it's 80%. We reallit hit the jackpot with this one. You're amazing for finding this CEO, half of his services are going to depend on our delivery and lawyers.",
      author: "Patrick",
    },
    next: "office:patrick:deal",
  },
  {
    id: "office:patrick:deal",
    data: {
      text: "I have something to ask you. I'm not sure if you're aware, but I'm striking for a promotion. I think I deserve it and want the boss to know about my ambitions. Would you mind if I make the contract with the client today?",
    },
    choices: [
      {
        text: "Sure, go ahead.",
        next: "office:patrick:deal:yes",
        onChoose: (state) => {
          return {
            ...state,
            egoism: state.egoism - 1,
          };
        },
      },
      {
        text: "No, I want to do it.",
        next: "office:patrick:deal:no",
        onChoose: (state) => {
          return {
            ...state,
            egoism: state.egoism + 1,
          };
        },
      },
    ],
  },
  {
    id: "office:patrick:deal:yes",
    data: {
      author: "Patrick",
      text: "Thanks mate. I'll return the favor one day.",
    },
    next: "office:patrick:deal",
  },
  {
    id: "office:patrick:deal:no",
    data: {
      author: "Patrick",
      text: "Ok. I understand that you worked hard on this.",
    },
    next: "office:gosling:deal",
  },
  {
    id: "office:bateman:deal",
    data: {
      text: "",
      bgImageUrl: "/images/bateman-deal.png",
    },
    next: "office:deal:remark",
  },
  {
    id: "office:gosling:deal",
    data: {
      text: "",
      bgImageUrl: "/images/gosling-deal.png",
    },
    next: "office:deal:remark",
  },
  {
    id: "office:deal:remark",
    data: {
      author: "Client",
      text: "Thanks for your cooperation. I'm looking forward to integrate your company's services into our business.",
    },
    next: "office:deal:boss",
  },
  {
    id: "office:deal:boss",
    data: {
      author: "Boss",
      text: "Great results. I was right to trust you into this position. Clients that work with car manufacturing companies often back off from such business deals, since they feel like their factories will bring them all their profits. Both companies will prosper from this deal.",
      bgImageUrl: "/images/discussing-boss.png",
    },
    next: "office:deal:boss:remark",
  },
  {
    id: "office:deal:boss:remark",
    data: {
      author: "Boss",
      text: "You and Patrick can both go home early today. The rest of the team will prepare the remaining paperwork. Your work is done for this week.",
    },
    next: "office:deal:boss:thanks",
  },
  {
    id: "office:deal:boss:thanks",
    data: {
      text: "Thanks, boss. I'll see you next week.",
    },
    next: "office:waving",
  },
  {
    id: "office:waving",
    data: ({ egoism }) => ({
      author: "Patrick",
      text:
        egoism > 0
          ? "See you next week."
          : "See you next week. I can't thank you enough for the opportunity.",
    }),
    next: "office:waving:bye",
  },
  {
    id: "office:waving:bye",
    data: {
      text: "Bye, Patrick. Have a nice weekend.",
    },
    next: "office:waving:parking",
  },
  {
    id: "office:waving:parking",
    data: {
      text: "I'm going to get my car. I went home by feet yesterday!",
    },
    next: "office:parking",
  },
  {
    id: "office:parking",
    data: {
      text: "",
      bgImageUrl: "/images/parking.png",
    },
    next: "office:parking:insight",
  },
  {
    id: "office:parking:insight",
    data: {
      text: "I'm not sure if I should have let Patrick take the leading role. He is a good employee and a great friend, but he lusts power. Lately he has been acting very self-centered and I'm not sure if he's in a good mental position.",
    },
    next: "office:parking:insight-2",
  },
  {
    id: "office:parking:insight-2",
    data: {
      text: "I'll talk to him about it. But for now, I need to hurry, because I have to...",
    },
    next: "drive",
  },
  {
    id: "drive",
    data: {
      text: "Drive",
      bgImageUrl: "/images/drive.png",
    },
    next: "drive:reasoning",
  },
  {
    id: "drive:reasoning",
    data: {
      text: "I have a well paying and respectable day job, but the income is not enough to reach my end goals.",
    },
    next: "drive:reasoning-2",
  },
  {
    id: "drive:reasoning-2",
    data: {
      text: "I'll use my skills to make money on the side, and my skills are driving",
    },
    next: "drive:reasoning-3",
  },
  {
    id: "drive:reasoning-3",
    data: {
      text: "My goal is to become financially independent and open a Stoicism school in Athens.",
    },
    next: "drive:message",
  },
  {
    id: "drive:message",
    data: {
      text: "*Notification*",
      bgImageUrl: "/images/gosling-reading-message.png",
    },
    next: "drive:message:read",
  },
  {
    id: "drive:message:read",
    data: {
      text: "My night shift clients are ready. I have to get there in 15 minutes.",
    },
    next: "drive:go",
  },
  {
    id: "drive:go",
    data: {
      text: "I think they plan a robbery.",
    },
    next: "drive:pickup",
  },
  {
    id: "drive:pickup",
    data: {
      text: "It seems to be these guys.",
      bgImageUrl: "/images/drive-clients.png",
    },
    next: "drive:pickup:chat",
  },
  {
    id: "drive:pickup:chat",
    data: {
      author: "Male robber",
      text: "Do you know the location?",
    },
    next: "drive:pickup:chat:reply",
  },
  {
    id: "drive:pickup:chat:reply",
    data: {
      author: "Ryan Gosling",
      text: "Yes, of course. Mc. Robbin Street 137, at the gas station.",
    },
    next: "drive:pickup:chat-2",
  },
  {
    id: "drive:pickup:chat-2",
    data: {
      author: "Female robber",
      text: "If we don't knock out the guard, we'll hav to go to the back door and steal the safe from there. Make a distraction when we give you the signal.",
    },
    next: "drive:pickup:chat-2:reply",
  },
  {
    id: "drive:pickup:chat-2:reply",
    data: {
      author: "Ryan Gosling",
      text: "I don't get involved in anything. I drive. I get you from place A to place B then I'll take you from place B to the getaway car.",
    },
    next: "drive:pickup:chat-3",
  },
  {
    id: "drive:pickup:chat-3",
    data: {
      author: "Male robber",
      text: "Dude, just get us there. We'll do the rest.",
    },
    next: "drive:gas-station",
  },
  {
    id: "drive:gas-station",
    data: {
      author: "Ryan Gosling",
      text: "This is the place. I stay here and wait for 5 minutes - no more no less, then I'll drive.",
      bgImageUrl: "/images/gas-station.png",
    },
    next: "drive:gas-station:robbery",
  },
  {
    id: "drive:gas-station:robbery",
    data: {
      text: "The robbers got out and headed to the gas station.",
      bgImageUrl: "/images/gas-station-robbery.png",
    },
    next: "drive:gas-station:robbery:remark",
  },
  {
    id: "drive:gas-station:robbery:remark",
    data: {
      text: "They look like it's one of their first times. Picking a gas station is not the best idea. Yet boss gave me this gig, so he sees some potential profit in this.",
    },
    next: "drive:gas-station:robbery:time-pass",
  },
  {
    id: "drive:gas-station:robbery:time-pass",
    data: {
      text: "*4 minutes pass*",
    },
    next: "drive:gas-station:leave-contemplation",
  },
  {
    id: "drive:gas-station:leave-contemplation",
    data: {
      text: "Time is almost up. They are still inside.",
      bgImageUrl: "gosling-looking-at-watch.png",
    },
    next: "drive:gas-station:leave-decision",
  },
  {
    id: "drive:gas-station:leave-decision",
    data: {
      text: "I have no obligation to stay, but I will not get in trouble if I wait just one more minute. Should I leave them behind?",
    },
    choices: [
      {
        text: "Yes",
        next: "drive:gas-station:leave:yes",
        onChoose: (state) => ({
          ...state,
          egoism: state.egoism + 1,
        }),
      },
      {
        text: "No",
        next: "drive:gas-station:leave:no",
        onChoose: (state) => ({
          ...state,
          egoism: state.egoism - 1,
        }),
      },
    ],
  },
  {
    id: "drive:gas-station:leave:yes",
    data: {
      text: "My job is done. I'll park the car at the underground parking near the office and walk from there.",
      bgImageUrl: "/images/drive-speeding.png",
    },
    next: "drive:home:parking",
  },
  {
    id: "drive:gas-station:leave:no",
    data: {
      text: "Just one more minute.",
      bgImageUrl: "/images/gas-station.png",
    },
    next: "drive:gas-station:wait",
  },
  {
    id: "drive:gas-station:wait",
    data: {
      text: "*1 minute passes*",
    },
    next: "drive:gas-station:robbers-leave",
  },
  {
    id: "drive:gas-station:robbers-leave",
    data: {
      text: "The robbers are finally getting out of that store, the man holding a heavy safe in his hands. The gun is missing from his pocket, he probably used it and threw it away.",
    },
    next: "drive:gas-station:robbers-in-car",
  },
  {
    id: "drive:gas-station:robbers-in-car",
    data: {
      author: "Male robber",
      text: "Dude! Why didn't you help us! Drive away faster",
    },
    next: "drive:speeding:robbers-reply",
  },
  {
    id: "drive:speeding:robbers-reply",
    data: {
      author: "Ryan Gosling",
      text: "That is your job. I drive. I'll leave you at the getaway car at the next corner.",
      bgImageUrl: "/images/drive-speeding.png",
    },
    next: "drive:speeding:home",
  },
  {
    id: "drive:speeding:home",
    data: {
      text: "Time to go home. I'll park the car in the underground garage next to the office building and walk from there. I'll take the money for the job the next time I go to the club.",
    },
    next: "drive:home:parking",
  },
  {
    id: "drive:home:parking",
    data: {
      bgImageUrl: "/images/parking.png",
      text: "I parked the car time to go through the dark alleys so I don't get noticed.",
    },
    next: "drive:home:alley",
  },
  {
    id: "end",
    data: {
      text: "Goodbye, world!",
    },
    isFinal: true,
  },
];
