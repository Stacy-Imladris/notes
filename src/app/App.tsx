import s from 'app/App.module.scss';

export const App = () => (
  <div className={s.appContainer}>
    <div>Header</div>
    <div>Tags</div>
    <div>
      <div>Search</div>
      <div>Notes</div>
      <div>Paginator</div>
    </div>
    <div>Footer</div>
  </div>
);
