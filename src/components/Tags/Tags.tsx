import { useEffect } from 'react';

import style from '../../common/styles/Button.module.scss';
import { selectTags } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearFilter, getTags } from '../../store/tags-reducer';

import { Tag } from './Tag/Tag';
import s from './Tags.module.scss';

export const Tags = () => {
  const tags = useAppSelector(selectTags);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const onClickClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className={s.tagsContainer}>
      <div className={s.titleAndBtn}>
        <div className={s.title}>Tags</div>
        <div>
          <button
            type="button"
            onClick={onClickClearFilter}
            className={style.button}
          >
            Show all
          </button>
        </div>
      </div>
      {tags.map(tag => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
