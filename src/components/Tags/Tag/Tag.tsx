import { memo, useCallback } from 'react';

import style from '../../../common/components/Button/Button.module.scss';
import { selectFilter } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  setFilter,
  deleteTag,
  TagType,
  removeFilter,
} from '../../../store/tags-reducer';

import s from './Tag.module.scss';

type TagPropsType = {
  tag: TagType;
};

export const Tag = memo(({ tag }: TagPropsType) => {
  const filter = useAppSelector(selectFilter);
  const { id, name } = tag;

  const dispatch = useAppDispatch();

  const removeTag = useCallback(() => {
    dispatch(deleteTag(id));
  }, [dispatch, id]);

  const onClickSetFilter = () => {
    if (!filter || filter.name !== name) dispatch(setFilter(tag));
    else if (filter.name === name) {
      dispatch(removeFilter({ id }));
    }
  };

  const tagStyle = filter && filter.id === id ? s.selected : '';

  return (
    <div
      role="presentation"
      onClick={onClickSetFilter}
      className={`${s.tagContainer} ${tagStyle}`}
    >
      <div>{name}</div>
      <div>
        <button type="button" onClick={removeTag} className={style.button}>
          ✘
        </button>
      </div>
    </div>
  );
});
