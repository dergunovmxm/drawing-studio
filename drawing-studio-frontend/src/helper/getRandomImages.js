export function getRandomItems(arr, n) {
  if (!Array.isArray(arr)) return [];
  const len = arr.length;
  if (n >= len) return arr.slice(); // вернуть копию, если запрос больше или равен доступному
  // алгоритм Фишера — Йетса для частичной перемешки
  const result = arr.slice();
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (len - i));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, n);
}
