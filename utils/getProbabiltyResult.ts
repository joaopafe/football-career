import { getRandomNumber } from "./getRandomNumber";

/**
 * Receives the number of attempts and probability of success and returns the number of successful plays
 * @param moves
 * @param probability
 * @returns successfulMoves
 */
export const getProbabilityResult = (
  moves: number,
  probability: number
): number => {
  let successfulMoves = 0;

  for (let i = 0; i < moves; i++) {
    const drawnNumber = getRandomNumber(100, 0);

    if (drawnNumber <= probability) {
      successfulMoves++;
    }
  }

  return successfulMoves;
};
