export type StoryCard = {
  photoStyle?: "corner" | "background";
  id: string;
  kind: "heading" | "body" | "heart" | "closing";
  lines: string[];
  /** Path under /public for the blurred reveal photo on this card. */
  photo: string;
};

export const storyCards: StoryCard[] = [
  {
    id: "sorry",
    kind: "heading",
    lines: ["I'm Sorry."],
    photo: "/photos/card-1.jpg",
  },
  {
    id: "hurt",
    kind: "body",
    lines: [
      "I know I hurt you.",
      "Whether I meant to or not...",
      "I know my actions made you feel bad.",
      "For that, I'm truly sorry.",
    ],
    photo: "/photos/card-2.jpg",
  },
  {
    id: "not-fix-everything",
    kind: "body",
    lines: [
      "I don't expect one website to fix everything.",
      "But I hope it reminds you how much you mean to me.",
      "It was so stupid of me to act like I used to",
      "You are my DREAM Girl"
    ],
    photo: "/photos/card-3.jpg",
  },
  {
    id: "beautiful-part",
    kind: "body",
    lines: [
      "Harshu... Sonu... Shona...Babu...Bubu...Pillu...Lekru",
      "whatever I call you,",
      "you're one of the most beautiful parts of my life.",
    ],
    photo: "/photos/card-4.jpg",
    photoStyle: "background"
  },
  {
    id: "rewind",
    kind: "body",
    lines: [
      "If I could rewind time...",
      "I'd choose kinder words.",
      "I'd understand you better.",
      "I'd never let you cry because of me.",
    ],
    photo: "/photos/card-5.jpg",
  },
  {
    id: "thank-you",
    kind: "body",
    lines: ["Thank you", "for every laugh.", "Every smile.", "Every conversation.", "Every memory."],
    photo: "/photos/card-6.jpg",
  },
  {
    id: "not-the-ending",
    kind: "body",
    lines: [
      "I don't want one mistake, sorry many mistakesss",
      "to become the ending",
      "of something beautiful.",
    ],
    photo: "/photos/card-7.jpg",
  },
  {
    id: "promise",
    kind: "body",
    lines: [
      "I promise to become a better version of myself.",
      "Not because I have to.",
      "Because you're worth it, babu.",
    ],
    photo: "/photos/card-8.jpg",
  },
    {
    id: "memories",
    kind: "body",
    lines: [
"I still remember how delicious that biryani and paneer rice were the day you fed me",
"I still remember eating lemon with almost every bite and how sweetly angry you got because of it",
"I still remember us walking hand in hand throughout Dadar wishing that walk would never end",
"I can never forget sitting down to help you wear your chappals because in that moment I truly felt like my queen was standing in front of me",
"I miss these moments more than words can ever express",
"Let's relive these memories again"
    ],
    photo: "/photos/card-9.jpg",
    photoStyle: "background"
  },
  {
    id: "please-forgive",
    kind: "heart",
    lines: ["Harshu... Bubu... Jiv...", "Please forgive me."],
    photo: "/photos/card-5.jpg",
  },
    {
    id: "please-forgive",
    kind: "heart",
    lines: ["Harshu... Bubu... Jiv...", "Please forgive me."],
    photo: "/photos/card-5.jpg",
  },
    {
      id: "ice-bags",
      kind: "heart",
      lines: ["Remember when we I had ordered ice cream online", "You kept that ice bag in the freezer", "right in the middle of those two ice creams"],
    photo: "/photos/card-9.jpg",
    photoStyle: "background"
    },
    {
    id: "take-blessing",
    kind: "heart",
    lines: ["For me you are my goddess and for us I've invited Ganpati Bappa and Swami Samarth to bless us."],
    photo: "/photos/god.jpg",
  }
];

export const letterText = `Dear Harshu,

I'm not perfect.
I know I've made mistakes.

But one thing I'll never stop being grateful for...
is having you in my life.

Thank you for every smile,
every memory,
every little moment.

I don't want my mistakes
to become the reason
I lose someone so precious.

If you'll give me another chance,
I'll spend every day proving
that my apology isn't just words.

With all my heart,
Yash ❤️`;
