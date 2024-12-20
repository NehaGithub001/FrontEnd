export function sortArray<T>(
  array: T[],
  column: keyof T,
  order: 'asc' | 'desc'
): T[] {
  return [...array].sort((a, b) => {
    const valueA = (a[column] || '').toString().toLowerCase();
    const valueB = (b[column] || '').toString().toLowerCase();

    if (order === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}
