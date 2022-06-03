import { useState } from 'react';

import { deleteNote, NoteType } from '../../../../store/notes-reducer';
import { useAppDispatch } from '../../../../store/store';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = ({ note }: NotePropsType) => {
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  const dispatch = useAppDispatch();

  const removeNote = () => {
    dispatch(deleteNote(note.id));
  };

  return (
    <div className={s.noteContainer}>
      <div>{note.title}</div>
      <button type="button" onClick={removeNote}>
        X
      </button>
      <div>{note.content}</div>
    </div>
  );
};
