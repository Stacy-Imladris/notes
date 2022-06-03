import { useEffect } from 'react';

import { getNotes } from '../../../store/notes-reducer';
import { selectNotes } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { Note } from './Note/Note';
import s from './NoteList.module.scss';

export const NoteList = () => {
  const notes = useAppSelector(selectNotes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <div className={s.noteListContainer}>
      <div>NoteList</div>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
