import { Header } from '../components/Header/Header';

import s from './App.module.scss';

export const App = () => (
  <div className={s.appContainer}>
    <Header />
    <div>Tags</div>
    <div>
      <div>Search</div>
      <div>Notes</div>
      <div>Paginator</div>
    </div>
    <div>Footer</div>
  </div>
);
