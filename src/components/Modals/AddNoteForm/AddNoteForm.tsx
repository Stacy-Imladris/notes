import { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { createNote } from '../../../store/notes-reducer';
import { selectTags } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Modal } from '../Modal/Modal';

type AddNoteFormPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
};
export const AddNoteForm: FC<AddNoteFormPropsType> = memo(
  ({ onClickNotOpen, isOpen }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const dispatch = useAppDispatch();

    const onClickCleanUpStates = () => {
      onClickNotOpen();
      setTitle('');
      setContent('');
    };

    const addNewNote = useCallback(() => {
      dispatch(createNote({ title, content }));
      onClickCleanUpStates();
    }, [dispatch, onClickNotOpen, title, content]);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value);
    };

    return (
      <Modal onClickNotOpen={onClickCleanUpStates} isOpen={isOpen}>
        <div>Add new note</div>
        <input
          value={title}
          placeholder="Enter note title"
          onChange={onChangeTitle}
        />
        <textarea
          value={content}
          placeholder="Enter note content"
          onChange={onChangeContent}
        />
        <div>
          <button type="button" onClick={onClickCleanUpStates}>
            Cancel
          </button>
          <button type="button" onClick={addNewNote}>
            Save
          </button>
        </div>
      </Modal>
    );
  },
);
