interface Change<T> {
  comparisonIndexes: number[],
  swappingIndexes: number[] | null,
  array: T[],
}

type ChangeLog<T> = Change<T>[];

type CompareFn<T> = (firstEl: T, secondEl: T) => number;

type SortFn<T> = (
  arr: T[], 
  compareFn?: CompareFn<T>,
  logChanges?: boolean,
) => T[] | [T[], ChangeLog<T>];