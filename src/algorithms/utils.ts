const defaultCompareFn = <T>(firstEl: T, secondEl: T): number => {
  return String(firstEl).localeCompare(String(secondEl));
}

export {defaultCompareFn}