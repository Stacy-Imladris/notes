import { memo, useCallback, useState } from 'react';

import { Button } from '../../../../common/components/Button/Button';
import { Title } from '../../../../common/components/Title/Title';
import { NoteType } from '../../../../store/notes-reducer';
import { selectTags } from '../../../../store/selectors';
import { useAppSelector } from '../../../../store/store';
import { createTagsList } from '../../../../utils/createTagsList';
import { DeleteNoteForm } from '../../../Modals/DeleteNoteForm/DeleteNoteForm';
import { EditNoteForm } from '../../../Modals/EditNoteForm/EditNoteForm';

import s from './Note.module.scss';

type NotePropsType = {
  note: NoteType;
};

export const Note = memo(({ note }: NotePropsType) => {
  const [isDeletingOpen, setIsDeletingOpen] = useState<boolean>(false);
  const [isEditingOpen, setIsEditingOpen] = useState<boolean>(false);

  const tags = useAppSelector(selectTags);

  const deleteNoteOff = useCallback(() => {
    setIsDeletingOpen(false);
  }, []);

  const deleteNoteOn = useCallback(() => {
    setIsDeletingOpen(true);
  }, []);

  const editNoteOff = useCallback(() => {
    setIsEditingOpen(false);
  }, []);

  const editNoteOn = useCallback(() => {
    setIsEditingOpen(true);
  }, []);

  const noteTags: string[] = createTagsList(note.content);
  const tagsForRender = tags.filter(tag => noteTags.includes(tag.name));

  return (
    <div className={s.noteContainer}>
      <DeleteNoteForm
        onClickNotOpen={deleteNoteOff}
        isOpen={isDeletingOpen}
        id={note.id}
      />
      <EditNoteForm
        onClickNotOpen={editNoteOff}
        isOpen={isEditingOpen}
        note={note}
      />
      <div className={s.btnAndTitle}>
        <div className={s.title}>
          <Title name={note.title} />
        </div>
        <div className={s.buttons}>
          <Button name="✎" onClickHandle={editNoteOn} />
          <Button name="✘" onClickHandle={deleteNoteOn} />
        </div>
      </div>
      <div className={s.note}>
        {note.content.split(' ').map(word => (
          <span
            key={word + Math.random()}
            className={word[0] === '#' ? s.tag : ''}
          >
            {`${word} `}
          </span>
        ))}
      </div>
      {tagsForRender.map(tag => (
        <span key={tag.id} className={`${s.tag} ${s.tagEl}`}>
          {tag.name}
        </span>
      ))}
    </div>
  );
});
