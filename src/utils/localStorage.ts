export function setItemInLocalStorage(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItemFromLocalStorage(key: string): any | null {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
