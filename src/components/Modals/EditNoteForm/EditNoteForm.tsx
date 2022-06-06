import { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import style from '../../../common/styles/Button.module.scss';
import errorStyle from '../../../common/styles/Error.module.scss';
import fieldsStyle from '../../../common/styles/Fields.module.scss';
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
    const [error, setError] = useState<string>('');

    const dispatch = useAppDispatch();

    const onClickCleanUpStates = () => {
      onClickNotOpen();
      setTitle(note.title);
      setContent(note.content);
      setError('');
    };

    const onClickUpdateNote = useCallback(() => {
      if (title.trim() && content.trim()) {
        dispatch(updateNote({ id: note.id, noteModel: { title, content } }));
        onClickCleanUpStates();
      } else {
        setError('Title and content is required!');
      }
    }, [dispatch, note.id, title, content]);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value);
    };

    return (
      <Modal
        onClickNotOpen={onClickCleanUpStates}
        isOpen={isOpen}
        modalStyle={{ width: '270px' }}
      >
        <div>Edit note</div>
        <div className={errorStyle.error}>{error}</div>
        <input
          value={title}
          placeholder="Enter new title"
          className={fieldsStyle.input}
          style={{ width: '200px', padding: '0 15px' }}
          onChange={onChangeTitle}
        />
        <textarea
          value={content}
          placeholder="Enter new content"
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
          <button
            type="button"
            onClick={onClickUpdateNote}
            className={style.button}
          >
            Save
          </button>
        </div>
      </Modal>
    );
  },
);
