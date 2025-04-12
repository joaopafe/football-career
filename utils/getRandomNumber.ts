/**
 * Provide the maximun and minimun numbers and get a random number on this range
 * @param max
 * @param min
 * @returns
 */
export const getRandomNumber = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};
