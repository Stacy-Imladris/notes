export const createTagsList = (content: string) => [
  ...new Set(content.split(' ').filter(f => f[0] === '#' && f.length > 1)),
];
