export default function groupBy<T>(
    values: T[],
    groupingKey: (entry: T) => any
) {
  const groups = {} as any;
  for (var entry of values) {
    var val = groupingKey(entry);
    let set = false;
    for (const key in groups)
      if (key === val) {
        groups[key].push(entry);
        set = true;
        break;
      }
    if (!set) {
      groups[val] = [entry];
    }
  }
  return groups
}
