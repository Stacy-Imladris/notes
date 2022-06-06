import { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import style from '../../../common/styles/Button.module.scss';
import errorStyle from '../../../common/styles/Error.module.scss';
import fieldsStyle from '../../../common/styles/Fields.module.scss';
import { createNote } from '../../../store/notes-reducer';
import { useAppDispatch } from '../../../store/store';
import { Modal } from '../Modal/Modal';

type AddNoteFormPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
};
export const AddNoteForm: FC<AddNoteFormPropsType> = memo(
  ({ onClickNotOpen, isOpen }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string>('');

    const dispatch = useAppDispatch();

    const onClickCleanUpStates = () => {
      onClickNotOpen();
      setTitle('');
      setContent('');
      setError('');
    };

    const addNewNote = useCallback(() => {
      if (title.trim() && content.trim()) {
        dispatch(createNote({ title, content }));
        onClickCleanUpStates();
      } else {
        setError('Title and content is required!');
      }
    }, [dispatch, onClickNotOpen, title, content]);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
      setError('');
    };

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value);
      setError('');
    };

    return (
      <Modal
        onClickNotOpen={onClickCleanUpStates}
        isOpen={isOpen}
        modalStyle={{ width: '270px' }}
      >
        <div>Add new note</div>
        <div className={errorStyle.error}>{error}</div>
        <input
          value={title}
          placeholder="Enter note title"
          onChange={onChangeTitle}
          className={fieldsStyle.input}
          style={{ width: '200px', padding: '0 15px' }}
        />
        <textarea
          value={content}
          placeholder="Enter note content"
          onChange={onChangeContent}
          className={fieldsStyle.textarea}
        />
        <div>
          <button
            type="button"
            onClick={onClickCleanUpStates}
            className={style.button}
          >
            Cancel
          </button>
          <button type="button" onClick={addNewNote} className={style.button}>
            Save
          </button>
        </div>
      </Modal>
    );
  },
);
