import { useEffect } from 'react';

import { createNote, getNotes } from '../../../store/notes-reducer';
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

  const addNote = () => {
    dispatch(createNote({ title: 'new Title', content: 'new Content' }));
  };

  return (
    <div className={s.noteListContainer}>
      <div>NoteList</div>
      <button type="button" onClick={addNote}>
        Add new Note
      </button>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
