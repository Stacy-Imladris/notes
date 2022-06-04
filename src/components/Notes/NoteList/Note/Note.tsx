import { useCallback, useState } from 'react';

import { NoteType } from '../../../../store/notes-reducer';
import { selectTags } from '../../../../store/selectors';
import { useAppSelector } from '../../../../store/store';
import { createTagsList } from '../../../../utils/createTagsList';
import { DeleteNoteForm } from '../../../Modals/DeleteNoteForm/DeleteNoteForm';
import { EditNoteForm } from '../../../Modals/EditNoteForm/EditNoteForm';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = ({ note }: NotePropsType) => {
  const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false);
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);

  const tags = useAppSelector(selectTags);

  const deleteNoteOff = useCallback(() => {
    setIsDeletingOpen(false);
  }, []);

  const deleteNoteOn = useCallback(() => {
    setIsDeletingOpen(true);
  }, []);

  const editNoteOff = useCallback(() => {
    setIsEditingOpen(false);
  }, []);

  const editNoteOn = useCallback(() => {
    setIsEditingOpen(true);
  }, []);

  const noteTags: string[] = createTagsList(note.content);
  const tagsForRender = tags.filter(tag => noteTags.includes(tag.name));

  return (
    <div className={s.noteContainer}>
      <DeleteNoteForm
        onClickNotOpen={deleteNoteOff}
        isOpen={isDeletingOpen}
        id={note.id}
      />
      <EditNoteForm
        onClickNotOpen={editNoteOff}
        isOpen={isEditingOpen}
        note={note}
      />
      <div>
        <b>{note.title}</b>
      </div>
      <button type="button" onClick={editNoteOn}>
        ✎
      </button>
      <button type="button" onClick={deleteNoteOn}>
        ✘
      </button>
      <div>
        {note.content.split(' ').map(word => (
          <span
            key={word + Math.random()}
            className={word[0] === '#' ? s.tag : ''}
          >
            {`${word} `}
          </span>
        ))}
      </div>
      {tagsForRender.map(tag => (
        <span key={tag.id} className={s.tag}>
          {`${tag.name} `}
        </span>
      ))}
    </div>
  );
};
