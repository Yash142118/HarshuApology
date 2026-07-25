export type ClosingPhoto = {
  src: string;
  caption: string;
};

/**
 * Shown as a slow, looping slideshow after she submits her answer.
 * Add real files at public/photos/closing-1.jpg ... closing-5.jpg
 * (see public/photos/README.txt), or edit this list to add more/fewer.
 */
export const closingPhotos: ClosingPhoto[] = [
  { src: "/photos/closing-1.jpg", caption: "This is us." },
  { src: "/photos/welcome.jpg", caption: "One of my favorite days." },
  { src: "/photos/closing-3.jpg", caption: "I still smile looking at this." },
  { src: "/photos/card-3.jpg", caption: "More of these, please." },
  { src: "/photos/minion.jpg", caption: "Our drawings" },
  { src: "/photos/together.jpg", caption: "Blessed" },
  { src: "/photos/card-7.jpg", caption: "Thank you for reading all of this." },
];
