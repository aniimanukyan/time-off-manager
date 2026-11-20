export const toInitials = (name: string): string =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');
