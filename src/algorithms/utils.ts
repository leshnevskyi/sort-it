import {cloneDeep} from 'lodash';

const defaultCompareFn = <T>(firstEl: T, secondEl: T): number => {
  return String(firstEl).localeCompare(String(secondEl));
}

interface SortingSnapshot<T> {
  array: T[];
  comparedElements: [StashableArrayElement<T>, StashableArrayElement<T>] | null;
  swapIndexes: [number, number] | null;
  replacementIndex: number | null;
}

class SortingLog<T> {
  #initialArray: T[];
  #log: SortingSnapshot<T>[] = [];

  constructor(initialArray: T[]) {
    this.#initialArray = initialArray;
  }

  add(snapshot: Partial<SortingSnapshot<T>>) {
    this.#log.push({
      /**
       * Default an array snapshot to the last element in the log, if it exists,
       * otherwise to an initial array.
       */
      array: this.#log.length 
        ? this.#log[this.#log.length - 1].array : this.#initialArray,
      comparedElements: null,
      swapIndexes: null,
      replacementIndex: null,
      ...snapshot,
    });
  }

  retrieve() {
    const log = cloneDeep(this.#log);

    this.clear();

    return log;
  }

  clear = () => this.#log.length = 0;
}

interface StashableArray<T> extends Array<T> {
	stash: (T | null)[];
}

interface StashableArrayElement<T> {
  index: number;
  value: T;
  isStashed: boolean;
}

interface SortFnListeners<T> {
  onCompare?: (
		firstEl: StashableArrayElement<T>, 
		secondEl: StashableArrayElement<T>, 
		result: number
	) => void;
  onSwap?: (firstIndex: number, secondIndex: number, changedArray: T[]) => void;
  onReplace?: (index: number, newValue: T, changedArray: T[]) => void; 
}

interface SortFn {
  <T>(array: T[]): T[];
  attachListeners: <T>(listeners: SortFnListeners<T>) => void;
}

interface SortFnContext<T> {
  array: StashableArray<T>;
  listeners: SortFnListeners<T>; 
	stash: (index: number) => void;
  compare(firstIndex: number, secondIndex: number): number;
  swap(firstIndex: number, secondIndex: number): void;
  replace(replacedElIndex: number, replacingElIndex: number): void;
}

type Algorithm<T> = (this: SortFnContext<T>) => void;

const createSortFn = function(algorithm: Algorithm<unknown>) {
  const sortFnContext: SortFnContext<unknown> = new class 
  implements SortFnContext<unknown> {
    #array: StashableArray<unknown> = Object.assign(Array<unknown>(), {stash: []}); 

    listeners: SortFnListeners<unknown> = {}; 

    get array() {
      return this.#array;
    }

    get arraySnapshot() {
      return cloneDeep(this.#array);
    }

    set array(array) {
      this.#array = Object.assign(cloneDeep(array), {
				stash: Array(array.length).fill(null)
			});
    }

		stash(index: number) {
			this.#array.stash[index] = this.#array[index];
		};

		unstash(index: number) {
			this.#array.stash[index] = null;
		}

    compare(firstIndex: number, secondIndex: number): number {
      const comparisonResult = defaultCompareFn(
        this.array.stash[firstIndex] ?? this.array[firstIndex], 
				this.array.stash[secondIndex] ?? this.array[secondIndex]
      );

      this.listeners.onCompare?.(
				{
					index: firstIndex,
					value: this.array[firstIndex],
					isStashed: this.array.stash[firstIndex] === null ? false : true,
				},
				{
					index: secondIndex,
					value: this.array[secondIndex],
					isStashed: this.array.stash[secondIndex] === null ? false : true,
				},
				comparisonResult
			);

      return comparisonResult;
    }
    
    swap(firstIndex: number, secondIndex: number) {
      [
        this.array[firstIndex], this.array[secondIndex]
      ] = [
        this.array[secondIndex], this.array[firstIndex]
      ];
      this.listeners.onSwap?.(firstIndex, secondIndex, this.arraySnapshot);
    }

		replace(replacedElIndex: number, replacingElIndex: number) {
			const replacingValue = this.array.stash[replacingElIndex]
				?? this.array[replacingElIndex];
			const valueIsStashed = Boolean(
				this.array.stash[replacingElIndex] !== null
			);
	
      this.array[replacedElIndex] = replacingValue;
			valueIsStashed && this.unstash(replacingElIndex);
      this.listeners.onReplace?.(
				replacedElIndex, replacingValue, this.arraySnapshot
			);
    }
  }

  const sortFn: SortFn = Object.assign(
		<T>(array: T[]) => function(this: SortFnContext<T>, array: T[]) {
				// @ts-ignore
				this.array = array;
				algorithm.call(this as SortFnContext<unknown>);

				return this.array as T[];
			}.call(sortFnContext as SortFnContext<T>, array),
    {
      attachListeners: (listeners: SortFnListeners<any>) => {
        for (const listener in listeners) {
          // @ts-ignore
          sortFnContext.listeners[listener] = listeners[listener];
        }
      }
    }
  );

  return sortFn;
}

export type {
	SortFn, 
	SortFnContext, 
	StashableArray, 
	StashableArrayElement,
	SortingSnapshot,
};
export {SortingLog};
export default createSortFn;