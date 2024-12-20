export function filterList<T>(list: T[], searchTerm: string, key: keyof T): T[] {
    const term = (searchTerm || '').toLowerCase();
  
    return list.filter(item =>
      (item[key] || '').toString().toLowerCase().includes(term)
    );
  }