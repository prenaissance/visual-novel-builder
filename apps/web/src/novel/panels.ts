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
    next: "office:bateman:deal-making",
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
    id: "office:bateman:deal-making",
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
      bgImageUrl: "/images/bateman-waving.png",
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
      text: "This is the place. I stay here and wait for 5 minutes - no more no less, then I'll drive. What happens afterwards is not my responsibility. Be on time if you want me to be the one who gets you out of trouble.",
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
      bgImageUrl: "/images/gosling-looking-at-watch.png",
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
      text: "Dude! Why didn't you help us! Drive away faster!",
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
      text: "I parked the car in the underground parking as usual. My day job coworkers do not notice that the car I use to get blood money is kept safe in the parking. The perfect spot that no one would suspect to be used for such a purpose.",
    },
    next: "drive:home:alley",
  },
  {
    id: "drive:home:alley",
    data: {
      bgImageUrl: "/images/dark-alley.png",
      text: "I am walking through the dark alley. I took this coming back from multiple gigs already and know it by heart. I am not afraid of the dark or the city at night, but my only fear is getting caught. My actions are not legal, but I am not a criminal. I am just a driver.",
    },
    next: "drive:home::alley:sound",
  },
  {
    id: "drive:home::alley:sound",
    data: {
      text: "Did I hear something there? It sounded like the voice of a woman. I should check it out.",
    },
    next: "psycho:woman",
  },
  {
    id: "psycho:woman",
    data: {
      bgImageUrl: "/images/bateman-homeless.png",
      text: "That is Patrick! What is he doing at this hour? He is usually at the club or ar fancy restaurants with his friends from work. He is not the type to hang out in the streets! And that woman, she looks like a prostitute. What the hell are they doing!?",
    },
    next: "psycho:woman:listen",
  },
  {
    id: "psycho:woman:listen",
    data: {
      text: "It's none of my business, but I should listen to what they are talking about.",
    },
    next: "psycho:woman:dialog-1",
  },
  {
    id: "psycho:woman:dialog-1",
    data: {
      author: "Patrick",
      text: "Are you willing to accept this money? Here, take it. I know you are in need.",
    },
    next: "psycho:woman:dialog-2",
  },
  {
    id: "psycho:woman:dialog-2",
    data: {
      author: "Prostitute",
      text: "Get away from me!",
    },
    next: "psycho:woman:dialog-3",
  },
  {
    id: "psycho:woman:dialog-3",
    data: {
      author: "Patrick",
      text: "Stupid bitch. I am going to murder you with my bare fists. I am going to kill you tonight for your sins.",
    },
    next: "psycho:peek",
  },
  {
    id: "psycho:peek",
    data: {
      bgImageUrl: "/images/gosling-peek.png",
      text: "What did I just see! This must be a misunderstanding and I'm seeing things out of context. I always trusted Patrick and he is an excellent worker! He probably has a sick fantasy for this and I found his guilty pleasure. Should I interfere?",
    },
    choices: [
      {
        text: "Face Patrick",
        next: "psycho:conflict",
      },
      {
        text: "Go home",
        next: "psycho:home",
        onChoose: (state) => ({
          ...state,
          egoism: state.egoism + 1,
        }),
      },
    ],
  },
  {
    id: "psycho:home",
    data: {
      text: "I heard too much today! I got into others' stuff and heard things I did not want to hear.",
    },
    next: "home:entrance",
  },
  {
    id: "home:entrance",
    data: {
      bgImageUrl: "/images/gosling-home.png",
      author: "Ryan Gosling",
      text: "And finally I'm home. I'll need to recover heavily from this trip.",
    },
    next: "home:sleep",
  },
  {
    id: "home:sleep",
    data: {
      text: "Ryan Gosling slept till noon. The thoughts of this day gave him vivid nightmares.",
    },
    next: "home:time-pass",
  },
  {
    id: "home:time-pass",
    data: {
      bgImageUrl: "/images/clock.png",
      text: "All his weekend Ryan stayed home. The next Monday he went to work as usual. He did not tell anyone about what he saw Patrick do. He did not want to get involved. He is not a hero. He is just a driver.",
    },
    next: "boss:promotion",
  },
  {
    id: "boss:promotion",
    data: {
      bgImageUrl: "/images/discussing-boss.png",
      author: "Boss",
      text: "Morning Ryan. As I promised, I will introduce you to the new project today. We are going to work with the biggest bank in Europe. They are going to open a new branch in this city and we are going to provide them with security services. We are going to be the first ones to work with them and we will get a lot of money for it. I am sure you will be happy with aiding them legally.",
    },
    next: "boss:promotion:project-thanks",
  },
  {
    id: "boss:promotion:project-thanks",
    data: {
      author: "Ryan Gosling",
      text: "Wow, Boss, I am flattered. I did my best to help with the last project and I am extremely pleased that you are giving me this opportunity. I will do my best to make you proud.",
    },
    next: "boss:promotion:offer",
  },
  {
    id: "boss:promotion:offer",
    data: {
      author: "Boss",
      text: "Ryan, I want to give you a promotion with this role. You will get paid twice as much, with a bit more responsibilities. Do you know your future responsibilities?",
    },
    choices: [
      {
        text: "Yes",
        next: "boss:promotion:offer:accept",
      },
      {
        text: "No",
        next: "boss:promotion:responsibilities-1",
      },
    ],
  },
  {
    id: "boss:promotion:responsibilities-1",
    data: {
      author: "Boss",
      text: "For the new role, you'll have to talk with their representatives directly and delegate the information to your coworkers. You will become their manager.",
    },
    next: "boss:promotion:responsibilities-2",
  },
  {
    id: "boss:promotion:responsibilities-2",
    data: {
      author: "Boss",
      text: "You might need to work over the 8 daily hours more often. Of course, no effort goes unpaid.",
    },
    next: "boss:promotion:offer",
  },
  {
    id: "boss:promotion:offer:accept",
    data: {
      bgImageUrl: "/images/gosling-office-smiling.png",
      author: "Ryan Gosling",
      text: "It is an honor, Boss. I accept the offer.",
    },
    next: "boss:promotion:offer:accept:thanks",
  },
  {
    id: "boss:promotion:offer:accept:thanks",
    data: {
      author: "Boss",
      text: "Thanks for your cooperation. You can go back to work and start your new role from tomorrow.",
    },
    next: "gosling:walk",
  },
  {
    id: "gosling:walk",
    data: {
      bgImageUrl: "/images/gosling-walk.png",
      text: "Ryan went home after work by foot. He was thinking about the new role and how he will handle it. With the extra money, he might be able to quit his night job and still reach his dream in a reasonable time.",
    },
    next: ({ egoism }) =>
      egoism >= 3 ? "gosling:about-to-be-attacked" : "gosling:happy-walk",
  },
  {
    id: "gosling:about-to-be-attacked",
    data: {
      text: "Ryan is daydreaming about his dreams coming true. He is not paying attention to his surrounding and something bad is about to appear out of the crowd.",
    },
    next: "gosling:attacked",
  },
  {
    id: "gosling:attacked",
    data: {
      bgImageUrl: "/images/gosling-fight.png",
      text: "Ryan got unexpectedly punched in the face. He tries to defend himself and return a punch back, but the attacker is to quick and he is knocked to the ground.",
    },
    next: "gosling:attacked:remark",
  },
  {
    id: "gosling:attacked:remark",
    data: {
      text: "He looks at the attackers face and recognizes him. It is the same guy whom he helped rob a gas station last Friday. He knows that he is in trouble and he is about to get killed.",
    },
    next: "gosling:dying",
  },
  {
    id: "gosling:dying",
    data: {
      bgImageUrl: "/images/gosling-dying.png",
      text: "Ryan fell to the ground. The attacker stabbed him in the gut and the punches he took made all his muscles feeble. This is the end of his life.",
    },
    next: "gosling:dying:response",
  },
  {
    id: "gosling:dying:response",
    data: {
      author: "Male robber",
      text: "If only you were a little kinder Gosling, and not so egocentric and mysterious. You betrayed people and expected to live a happy life after that.",
    },
    next: "egoistic-ending",
  },
  {
    id: "egoistic-ending",
    data: {
      text: "The end. Reached the egoistic ending.",
    },
    isFinal: true,
  },
  {
    id: "gosling:happy-walk",
    data: {
      text: "Many thoughts were going through Ryan's head. He knows he has a bright future ahead.",
    },
    next: "stoicism:summary-1",
  },
  {
    id: "stoicism:summary-1",
    data: {
      bgImageUrl: "/images/clock.png",
      text: "Ryan Gosling worked hard at his business job. He lead the team through the 4 years of the project's existence and resigned when the deal with the collaborator ended. He had well above of what he needed to open his Stoicism school and get enough money from dividends to live comfortably.",
    },
    next: "stoicism:summary-2",
  },
  {
    id: "stoicism:summary-2",
    data: {
      text: "Patrick, on the other hand, was diagnosed with schizophrenia and was put in a psych ward. While no one from his work colleagues knew, he threatened to kill hookers and hobos in the city. During his interrogation he plead of being a serial killer, but no evidence was found that he actually killed anyone.",
    },
    next: "stoicism:summary-3",
  },
  {
    id: "stoicism:summary-3",
    data: {
      text: "Ryan Gosling could have helped Patrick by reporting the situation he saw that night, but he chose not to. He is a stoic and the thoughts of the past do not affect him. He often tells his students about this story and once in a while visits him at the mental facility.",
    },
    next: "stoicism:school",
  },
  {
    id: "stoicism:school",
    data: {
      bgImageUrl: "/images/gosling-greece.png",
      text: "Ryan Gosling opened his Stoicism school in Greece. He teaches his students about the philosophy and how to apply it in their daily lives. He is a very popular teacher and his students are very happy with his teachings.",
    },
    next: "stoicism:happy-ending",
  },
  {
    id: "stoicism:happy-ending",
    data: {
      text: "The end. Reached the stoic ending.",
    },
    isFinal: true,
  },
  {
    id: "end",
    data: {
      text: "Goodbye, world!",
    },
    isFinal: true,
  },
];
