import { useCallback, useEffect, useState } from 'react';

import { createNote, getNotes } from '../../../store/notes-reducer';
import { selectNotes } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { AddNoteForm } from '../../Modals/AddNoteForm/AddNoteForm';

import { Note } from './Note/Note';
import s from './NoteList.module.scss';

export const NoteList = () => {
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);

  const notes = useAppSelector(selectNotes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  const addNoteOff = useCallback(() => {
    setIsAddingOpen(false);
  }, []);

  const addNoteOn = useCallback(() => {
    setIsAddingOpen(true);
  }, []);

  return (
    <div className={s.noteListContainer}>
      <AddNoteForm onClickNotOpen={addNoteOff} isOpen={isAddingOpen} />
      <div>NoteList</div>
      <button type="button" onClick={addNoteOn}>
        Add new Note
      </button>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};
