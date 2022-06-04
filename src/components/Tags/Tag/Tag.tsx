import { useAppDispatch } from '../../../store/store';
import { deleteTag, TagType } from '../../../store/tags-reducer';

import s from './Tag.module.scss';

type TagPropsType = {
  tag: TagType;
};

export const Tag = ({ tag }: TagPropsType) => {
  const dispatch = useAppDispatch();

  const removeTag = () => {
    dispatch(deleteTag(tag.id));
  };

  return (
    <div className={s.tagContainer}>
      <div>{tag.name}</div>
      <button type="button" onClick={removeTag}>
        ✘
      </button>
    </div>
  );
};
