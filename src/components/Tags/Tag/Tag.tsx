import style from '../../../common/styles/Button.module.scss';
import { selectFilter } from '../../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  setFilter,
  deleteTag,
  removeFilter,
  TagType,
} from '../../../store/tags-reducer';

import s from './Tag.module.scss';

type TagPropsType = {
  tag: TagType;
};

export const Tag = ({ tag }: TagPropsType) => {
  const filter = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

  const removeTag = () => {
    dispatch(deleteTag(tag.id));
  };

  const onClickSetFilter = () => {
    if (!filter || filter.name !== tag.name) dispatch(setFilter(tag));
    else if (filter.name === tag.name) {
      dispatch(removeFilter({ id: tag.id }));
    }
  };

  const tagStyle = filter && filter.id === tag.id ? s.selected : '';

  return (
    <div
      role="presentation"
      onClick={onClickSetFilter}
      className={`${s.tagContainer} ${tagStyle}`}
    >
      <div>{tag.name}</div>
      <div>
        <button type="button" onClick={removeTag} className={style.button}>
          ✘
        </button>
      </div>
    </div>
  );
};
