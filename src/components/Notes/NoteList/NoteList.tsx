import { useEffect } from 'react';

import { getNotes } from '../../../store/notes-reducer';
import { selectFilter, selectNotes } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { Note } from './Note/Note';
import s from './NoteList.module.scss';

export const NoteList = () => {
  const notes = useAppSelector(selectNotes);
  const filter = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes(''));
  }, []);

  const filteredNotes = !filter
    ? notes
    : notes.filter(note => note.tags.map(m => m.name).includes(filter.name));

  return (
    <div className={s.noteListContainer}>
      {filteredNotes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
