import { FC, memo, useCallback, useState } from 'react';

import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';
import { Textarea } from '../../../common/components/Textarea/Textarea';
import style from '../../../common/styles/Buttons.module.scss';
import errorStyle from '../../../common/styles/Error.module.scss';
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

    const onChangeTitle = (value: string) => {
      setTitle(value);
      setError('');
    };

    const onChangeContent = (value: string) => {
      setContent(value);
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
        <Input
          value={title}
          onChangeCallback={onChangeTitle}
          placeholder="Enter new title"
          style={{ width: '200px', padding: '0 15px' }}
        />
        <Textarea
          value={content}
          onChangeCallback={onChangeContent}
          placeholder="Enter note content"
        />
        <div className={style.buttons}>
          <Button name="Cancel" onClickHandle={onClickCleanUpStates} />
          <Button name="Save" onClickHandle={addNewNote} />
        </div>
      </Modal>
    );
  },
);
