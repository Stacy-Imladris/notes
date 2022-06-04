import { Dispatch } from 'react';

import { v1 } from 'uuid';

import { createTag, TagType } from '../store/tags-reducer';

export const createNewTags = (
  uniqueTags: string[],
  tags: TagType[],
  dispatch: Dispatch<any>,
) => {
  const noteTags: TagType[] = [];
  uniqueTags.forEach(name => {
    const ind = tags.findIndex(f => f.name === name);
    if (ind > -1) noteTags.push(tags[ind]);
    else {
      const tag = { name, id: v1() };
      dispatch(createTag(tag));
      noteTags.push(tag);
    }
  });
  return noteTags;
};
