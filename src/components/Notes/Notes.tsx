import { NoteList } from './NoteList/NoteList';
import s from './Notes.module.scss';
import { Paginator } from './Paginator/Paginator';
import { SearchField } from './SearchField/SearchField';

export const Notes = () => (
  <div className={s.notesContainer}>
    <SearchField />
    <NoteList />
    <Paginator />
  </div>
);
