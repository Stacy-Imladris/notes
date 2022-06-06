import { FC, memo, useCallback } from 'react';

import style from '../../../common/styles/Button.module.scss';
import { deleteNote } from '../../../store/notes-reducer';
import { useAppDispatch } from '../../../store/store';
import { Modal } from '../Modal/Modal';

type DeleteNoteFormPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
  id: string;
};
export const DeleteNoteForm: FC<DeleteNoteFormPropsType> = memo(
  ({ onClickNotOpen, isOpen, id }) => {
    const dispatch = useAppDispatch();

    const onClickDeleteNote = useCallback(() => {
      dispatch(deleteNote(id));
      onClickNotOpen();
    }, [dispatch, onClickNotOpen, id]);

    return (
      <Modal onClickNotOpen={onClickNotOpen} isOpen={isOpen}>
        <div style={{ margin: '15px' }}>Do you really want to remove note?</div>
        <div>
          <button
            type="button"
            onClick={onClickNotOpen}
            className={style.button}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClickDeleteNote}
            className={style.button}
            style={{ backgroundColor: '#f34e4e' }}
          >
            Delete
          </button>
        </div>
      </Modal>
    );
  },
);
