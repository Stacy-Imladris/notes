import { ChangeEvent, useState } from 'react';

import {
  deleteNote,
  NoteType,
  updateNote,
} from '../../../../store/notes-reducer';
import { useAppDispatch } from '../../../../store/store';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = ({ note }: NotePropsType) => {
  const [isTitleEditMode, setIsTitleEditMode] = useState<boolean>(false);
  const [isContentEditMode, setIsContentEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  const dispatch = useAppDispatch();

  const removeNote = () => {
    dispatch(deleteNote(note.id));
  };

  const turnOnTitleEditMode = () => {
    setIsTitleEditMode(true);
  };

  const turnOffTitleEditMode = () => {
    dispatch(updateNote({ id: note.id, noteModel: { title } }));
    setIsTitleEditMode(false);
  };

  const turnOnContentEditMode = () => {
    setIsContentEditMode(true);
  };

  const turnOffContentEditMode = () => {
    dispatch(
      updateNote({
        id: note.id,
        noteModel: { content },
      }),
    );
    setIsContentEditMode(false);
  };

  const changeNoteTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const changeNoteContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <div className={s.noteContainer}>
      {isTitleEditMode ? (
        <input
          value={title}
          onChange={changeNoteTitle}
          onBlur={turnOffTitleEditMode}
        />
      ) : (
        <div onDoubleClick={turnOnTitleEditMode}>{note.title}</div>
      )}
      <button type="button" onClick={removeNote}>
        X
      </button>
      {isContentEditMode ? (
        <textarea
          value={content}
          onChange={changeNoteContent}
          onBlur={turnOffContentEditMode}
        />
      ) : (
        <div onDoubleClick={turnOnContentEditMode}>{note.content}</div>
      )}
    </div>
  );
};
