import { useCallback, useState } from 'react';

import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';
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
    (value1: string) => {
      setValue(value1);
      clearTimeout(timerId);
      const delayTime = 500;
      const id: number = +setTimeout(
        onChangeDebounceRequest,
        delayTime,
        value1,
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
      <Input
        value={value}
        onChangeCallback={onChangeSetValue}
        placeholder="Search"
      />
      <Button name="Add note" onClickHandle={addNoteOn} />
    </div>
  );
};
