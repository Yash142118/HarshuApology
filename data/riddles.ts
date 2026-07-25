export type Riddle = {
  question: string;
  hint: string;
  /** Compared case/punctuation/space-insensitively — see normalize() in LockScreen.tsx */
  answer: string;
  wrongMessage: string;
};

export const riddles: Riddle[] = [
  {
    question: "Shinchan kasa dance karto?",
    hint: "N _ _ _ O   N _ _ _ O",
    answer: "nacho nacho",
    wrongMessage: "Nope, try again ❤️",
  },
  {
    question: "What does Peppa Pig say?",
    hint: "I'm Peppa P _ _",
    answer: "im peppa pig",
    wrongMessage: "So close... try again ❤️",
  },
];
