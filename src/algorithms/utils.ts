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
	stash: StashedElement<T>[];
}

interface StashableArrayElement<T> {
  index: number;
  value: any;
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

class StashedElement<T> {
	index: number;
	value: T;
	unstashHandler?: Function;

	constructor(index: number, value: T, unstashHandler?: Function) {
		this.index = index;
		this.value = value;
		this.unstashHandler = unstashHandler;
	}

	unstash() {
		this.unstashHandler?.();

		return this;
	}
}

interface SortFnContext<T> {
  array: T[];
  listeners: SortFnListeners<T>; 
	stash: (index: number) => StashedElement<T>;
  compare(firstIndex: number, secondIndex: number): number;
	compare<T>(index: number, stashedEl: StashedElement<T>): number;
  swap(firstIndex: number, secondIndex: number): void;
  replace(fromIndex: number, toIndex: number): void;
	replace<T>(index: number, newValue: StashedElement<T>): void;
}

type Algorithm<T> = (this: SortFnContext<T>) => void;

const createSortFn = function(algorithm: Algorithm<any>) {
  const sortFnContext: SortFnContext<any> = new class 
  implements SortFnContext<any> {
    #array: StashableArray<any> = Object.assign(Array<any>(), {stash: []}); 

    listeners: SortFnListeners<any> = {}; 

    get array() {
      return this.#array;
    }

    get arraySnapshot() {
      return cloneDeep(this.#array);
    }

    set array(array) {
      this.#array = Object.assign(cloneDeep(array), {stash: []});
    }

		stash(index: number) {
			const stashedEl = new StashedElement(
				index, this.#array[index], this.#array.stash.pop
			);

			this.#array.stash.push(stashedEl);

			return stashedEl;
		};

    compare(firstIndex: number, secondIndex: number): number;
		compare<T>(index: number, stashedEl: StashedElement<T>): number;
		compare<T>(firstIndex: number, secondArg: number | StashedElement<T>) {
      const comparisonResult = defaultCompareFn(
        this.array[firstIndex], secondArg instanceof StashedElement 
					? secondArg.value : this.array[secondArg]
      );

      this.listeners.onCompare?.(
				{
					index: firstIndex,
					value: this.array[firstIndex],
					isStashed: false,
				},
				secondArg instanceof StashedElement 
					? {...secondArg, isStashed: true}
					: {
						index: secondArg,
						value: this.array[secondArg],
						isStashed: false,
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

		replace(fromIndex: number, toIndex: number): void;
    replace<T>(index: number, newValue: StashedElement<T>): void;
		replace<T>(index: number, secondArg: number | StashedElement<T>) {
			const newValue = secondArg instanceof StashedElement 
				? secondArg.value : this.array[secondArg];

      this.array[index] = newValue;
      this.listeners.onReplace?.(index, newValue, this.arraySnapshot);
    }
  }

  const sortFn: SortFn = Object.assign(
		<T>(array: T[]) => function(this: SortFnContext<T>, array: T[]) {
				this.array = array;
				algorithm.call(this);

				return this.array as T[];
			}.call(sortFnContext, array),
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