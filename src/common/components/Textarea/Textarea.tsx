import { ChangeEvent, FC, memo } from 'react';

import s from './Textarea.module.scss';

export type TextareaPropsType = {
  value: string;
  placeholder: string;
  onChangeCallback: (value: string) => void;
};

export const Textarea: FC<TextareaPropsType> = ({
  value,
  placeholder,
  onChangeCallback,
}) => {
  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCallback(e.currentTarget.value);
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandle}
      className={s.textarea}
    />
  );
};
