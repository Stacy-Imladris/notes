import { CSSProperties, FC, memo } from 'react';

import s from './Button.module.scss';

export type ButtonPropsType = {
  name: string;
  onClickHandle: () => void;
  style?: CSSProperties;
};

export const Button: FC<ButtonPropsType> = ({ name, onClickHandle, style }) => (
  <div>
    <button
      type="button"
      onClick={onClickHandle}
      className={s.button}
      style={{ ...style }}
    >
      {name}
    </button>
  </div>
);

Button.defaultProps = {
  style: {},
};
