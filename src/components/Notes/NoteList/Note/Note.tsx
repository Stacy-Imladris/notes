import { NoteType } from '../../../../store/notes-reducer';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = ({ note }: NotePropsType) => (
  <div className={s.noteContainer}>
    <div>{note.title}</div>
    <div>{note.content}</div>
  </div>
);
