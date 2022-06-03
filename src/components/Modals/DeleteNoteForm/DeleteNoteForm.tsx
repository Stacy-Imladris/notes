import { FC, memo, useCallback } from 'react';

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
        <div>Do you really want to remove note?</div>
        <div>
          <button type="button" onClick={onClickNotOpen}>
            Cancel
          </button>
          <button type="button" onClick={onClickDeleteNote}>
            Delete
          </button>
        </div>
      </Modal>
    );
  },
);
