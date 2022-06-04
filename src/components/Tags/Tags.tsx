import { useEffect } from 'react';

import { selectTags } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getTags } from '../../store/tags-reducer';

import { Tag } from './Tag/Tag';
import s from './Tags.module.scss';

export const Tags = () => {
  const tags = useAppSelector(selectTags);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <div className={s.tagsContainer}>
      <div>Tags</div>
      {tags.map(tag => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
