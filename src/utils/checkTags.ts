import { TagType } from '../store/tags-reducer';

export const checkTags = (content: string, tags: TagType[] = []) =>
  content
    .split(' ')
    .filter(f => f[0] === '#' && !tags.map(m => m.name).includes(f));
