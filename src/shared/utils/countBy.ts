export function countBy<T extends { status: string }>(
  data: T[],
  status: string,
): number {
  return data.filter((item) => item.status === status).length;
}
