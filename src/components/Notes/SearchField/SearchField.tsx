import { ChangeEvent, useCallback, useState } from 'react';

import style from '../../../common/styles/Button.module.scss';
import fieldsStyle from '../../../common/styles/Fields.module.scss';
import { getNotes } from '../../../store/notes-reducer';
import { useAppDispatch } from '../../../store/store';
import { AddNoteForm } from '../../Modals/AddNoteForm/AddNoteForm';

import s from './SearchField.module.scss';

export const SearchField = () => {
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [timerId, setTimerId] = useState<number>(0);

  const dispatch = useAppDispatch();

  const onChangeDebounceRequest = useCallback(
    (newValue: string) => {
      dispatch(getNotes(newValue));
    },
    [dispatch],
  );

  const onChangeSetValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      clearTimeout(timerId);
      const delayTime = 500;
      const id: number = +setTimeout(
        onChangeDebounceRequest,
        delayTime,
        e.currentTarget.value,
      );
      setTimerId(id);
    },
    [onChangeDebounceRequest, timerId],
  );

  const addNoteOff = useCallback(() => {
    setIsAddingOpen(false);
  }, []);

  const addNoteOn = useCallback(() => {
    setIsAddingOpen(true);
  }, []);

  return (
    <div className={s.searchFieldContainer}>
      <AddNoteForm onClickNotOpen={addNoteOff} isOpen={isAddingOpen} />
      <div className={s.searchIcon}>🔍︎</div>
      <div>
        <input
          value={value}
          onChange={onChangeSetValue}
          placeholder="Search"
          className={fieldsStyle.input}
        />
      </div>
      <div>
        <button type="button" onClick={addNoteOn} className={style.button}>
          Add new note
        </button>
      </div>
    </div>
  );
};
