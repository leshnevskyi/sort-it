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

function countDecimalPlaces(number: number) {
  if (Math.floor(number) === number) return 0;

  return number.toString().split('.')[1].length || 0; 
}

export {generateRandomNumbers, countDecimalPlaces};