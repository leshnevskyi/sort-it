import {round, random} from 'lodash-es';

function generateRandomNumbers(
  arrayLength: number,
  lowerBound: number = 0.05,
  upperBound: number = 1,
  precision: number = 3
): number[] {
  return [...Array(arrayLength)].map(() => {
    return round(random(lowerBound, upperBound, true), precision);
  });
}

function countDecimalPlaces(number: number) {
  if (Math.floor(number) === number) return 0;

  return number.toString().split('.')[1].length || 0; 
}

export {generateRandomNumbers, countDecimalPlaces};