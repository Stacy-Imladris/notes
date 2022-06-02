import s from './Notes.module.scss';
import { Paginator } from './Paginator/Paginator';
import { SearchField } from './SearchField/SearchField';

export const Notes = () => (
  <div className={s.notesContainer}>
    <SearchField />
    <div>Notes</div>
    <Paginator />
  </div>
);
