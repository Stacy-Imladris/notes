import { useCallback, useEffect } from 'react';

import { Button } from '../../common/components/Button/Button';
import { Title } from '../../common/components/Title/Title';
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
  }, [dispatch]);

  const onClickClearFilter = useCallback(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  return (
    <div className={s.tagsContainer}>
      <div className={s.titleAndBtn}>
        <Title name="Tags" />
        <Button name="Show all" onClickHandle={onClickClearFilter} />
      </div>
      {tags.map(tag => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
};
