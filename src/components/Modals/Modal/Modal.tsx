import { CSSProperties, FC, memo, ReactNode } from 'react';

import ReactDOM from 'react-dom';

import s from './Modal.module.scss';

type ModalPropsType = {
  onClickNotOpen: () => void;
  isOpen: boolean;
  backgroundStyle?: CSSProperties;
  modalStyle?: CSSProperties;
  children: ReactNode;
};

export const Modal: FC<ModalPropsType> = memo(
  ({ onClickNotOpen, isOpen, children, backgroundStyle, modalStyle }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <>
        <div
          role="presentation"
          style={{ ...backgroundStyle }}
          className={s.background}
          onClick={onClickNotOpen}
        />
        <div style={{ ...modalStyle }} className={s.modal}>
          <div className={s.escape}>
            <div role="presentation" onClick={onClickNotOpen}>
              ✘
            </div>
          </div>
          {children}
        </div>
      </>,
      document.body,
    );
  },
);
