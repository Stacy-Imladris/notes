import { useEffect, useState } from 'react';

import axios from 'axios';

import { Note } from './Note/Note';
import s from './NoteList.module.scss';

export type NoteType = {
  id: number;
  order: number;
  title: string;
  content: string;
};

export const NoteList = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/notes').then(res => setNotes(res.data));
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
