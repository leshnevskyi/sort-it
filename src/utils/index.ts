import {random} from 'lodash-es';
import {nanoid} from 'nanoid';

function generateRandomBarArray(
  arrayLength: number,
  lowerBound: number = 0,
  upperBound: number = 1,
): Bar[] {
  return [...Array(arrayLength)].map(() => {
    return {
      id: nanoid(), 
      value: random(lowerBound, upperBound, true)
    };
  });
}

export {generateRandomBarArray};