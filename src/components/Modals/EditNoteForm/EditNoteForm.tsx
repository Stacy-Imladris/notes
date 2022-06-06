import { FC, memo, useCallback, useState } from 'react';

import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';
import { Textarea } from '../../../common/components/Textarea/Textarea';
import style from '../../../common/styles/Buttons.module.scss';
import errorStyle from '../../../common/styles/Error.module.scss';
import { NoteType, updateNote } from '../../../store/notes-reducer';
import { useAppDispatch } from '../../../store/store';
import { Modal } from '../Modal/Modal';

type EditNoteFormPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
  note: NoteType;
};

export const EditNoteForm: FC<EditNoteFormPropsType> = ({
  onClickNotOpen,
  isOpen,
  note,
}) => {
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

  const onChangeTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <Modal
      onClickNotOpen={onClickCleanUpStates}
      isOpen={isOpen}
      modalStyle={{ width: '270px' }}
    >
      <div>Edit note</div>
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
        placeholder="Enter new content"
      />
      <div className={style.buttons}>
        <Button name="Cancel" onClickHandle={onClickCleanUpStates} />
        <Button name="Save" onClickHandle={onClickUpdateNote} />
      </div>
    </Modal>
  );
};
