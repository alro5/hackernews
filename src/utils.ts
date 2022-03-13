export function formatDate(date: Date) {
  return Intl.DateTimeFormat().format(date);
}
