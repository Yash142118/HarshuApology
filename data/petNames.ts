export const petNames = [
  "Sonu",
  "Shona",
  "Babu",
  "Bubu",
  "Baby",
  "Harshu",
  "Jiv",
  "Lekru",
] as const;

export function randomPetName(): string {
  return petNames[Math.floor(Math.random() * petNames.length)];
}
