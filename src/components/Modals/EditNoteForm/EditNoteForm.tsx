import { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { NoteType, updateNote } from '../../../store/notes-reducer';
import { useAppDispatch } from '../../../store/store';
import { Modal } from '../Modal/Modal';

type EditNoteFormPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
  note: NoteType;
};

export const EditNoteForm: FC<EditNoteFormPropsType> = memo(
  ({ onClickNotOpen, isOpen, note }) => {
    const [title, setTitle] = useState<string>(note.title);
    const [content, setContent] = useState<string>(note.content);

    const dispatch = useAppDispatch();

    const onClickCleanUpStates = () => {
      onClickNotOpen();
      setTitle(note.title);
      setContent(note.content);
    };

    const onClickUpdateNote = useCallback(() => {
      dispatch(updateNote({ id: note.id, noteModel: { title, content } }));
      onClickCleanUpStates();
    }, [dispatch, note.id, title, content]);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value);
    };

    return (
      <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Edit note</div>
        <input
          value={title}
          placeholder="Enter new title"
          onChange={onChangeTitle}
        />
        <textarea
          value={content}
          placeholder="Enter new content"
          onChange={onChangeContent}
        />
        <div>
          <button type="button" onClick={onClickCleanUpStates}>
            Cancel
          </button>
          <button type="button" onClick={onClickUpdateNote}>
            Save
          </button>
        </div>
      </Modal>
    );
  },
);
