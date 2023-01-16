// export const isEmpty = (obj) =>
//   Object.values(obj).reduce(
//     (acc, currValue) => (acc = currValue === ""),
//     false
//   );

export const isEmpty = (obj) =>
  Object.values(obj).every((value) => value === "");
