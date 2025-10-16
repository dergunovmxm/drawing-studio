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

export function pickRandomPerAlias(data) {
  if (!Array.isArray(data)) return [];

  const groups = data.reduce((acc, item) => {
    const key = item.alias ?? "__no_alias__";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const result = Object.values(groups).map((group) => {
    const i = Math.floor(Math.random() * group.length);
    return group[i];
  });

  return result;
}
