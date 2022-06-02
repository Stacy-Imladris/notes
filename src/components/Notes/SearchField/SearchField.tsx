import { ChangeEvent, useState } from 'react';

import s from './SearchField.module.scss';

export const SearchField = () => {
  const [value, setValue] = useState<string>('');

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={s.searchFieldContainer}>
      Search
      <input value={value} onChange={onChangeHandle} />
    </div>
  );
};
