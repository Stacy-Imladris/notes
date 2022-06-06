import s from './Title.module.scss';

type TitlePropsType = {
  name: string;
};

export const Title = ({ name }: TitlePropsType) => (
  <div className={s.title}>{name}</div>
);
