export type ClosingTrack = {
  title: string;
  src: string;
};

/**
 * Edit freely — add, remove, or reorder. These only play on the very
 * last screen (the closing slideshow), and take over from whatever
 * the main site music was playing, so there's never two songs at once.
 */
export const closingTracks: ClosingTrack[] = [
{ title: "Our song, but I feel it now", src: "/music/Abhi-Na-Jao.mp3" },
  { title: "Its a facttt", src: "/music/A-Thousand-Years.mp3" },
  { title: "For youu", src: "/music/Bairan.mp3" },
  { title: "You love this I know", src: "/music/Chaar-Kadam.mp3" }
];