import { useCallback, useState } from 'react';

import { NoteType } from '../../../../store/notes-reducer';
import { DeleteNoteForm } from '../../../Modals/DeleteNoteForm/DeleteNoteForm';
import { EditNoteForm } from '../../../Modals/EditNoteForm/EditNoteForm';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = ({ note }: NotePropsType) => {
  const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false);
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);

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
        X
      </button>
      <div>{note.content}</div>
    </div>
  );
};
