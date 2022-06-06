import {
  ChangeEvent,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  memo,
  useState,
} from 'react';

import s from './Input.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeCallback: (value: string) => void;
  style?: CSSProperties;
};

export const Input: FC<InputPropsType> = ({
  style,
  onChangeCallback,
  ...restProps
}) => {
  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCallback(e.currentTarget.value);
  };

  return (
    <input
      onChange={onChangeHandle}
      placeholder="Search"
      className={s.input}
      style={{ ...style }}
      {...restProps}
    />
  );
};

Input.defaultProps = {
  style: {},
};
