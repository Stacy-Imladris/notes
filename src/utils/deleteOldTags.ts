import { Dispatch } from 'react';

import { NoteType } from '../store/notes-reducer';
import { deleteTag, TagType } from '../store/tags-reducer';

export const deleteOldTags = (
  initialTags: TagType[],
  uniqueTags: string[],
  notes: NoteType[],
  dispatch: Dispatch<any>,
) => {
  const tagsForDeleting = initialTags.filter(
    f =>
      !uniqueTags.includes(f.name) &&
      !notes
        .map(m => m.tags.map(tag => tag.name))
        .every(el => !el.includes(f.name)),
  );
  tagsForDeleting.forEach(tag => dispatch(deleteTag(tag.id)));
};
