import {random} from 'lodash-es';

function generateRandomNumbers(
  arrayLength: number,
  lowerBound: number = 0.05,
  upperBound: number = 1,
): number[] {
  return [...Array(arrayLength)].map(() => {
    return random(lowerBound, upperBound, true);
  });
}

export {generateRandomNumbers};