import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Notes } from '../components/Notes/Notes';
import { Tags } from '../components/Tags/Tags';

import s from './App.module.scss';

export const App = () => (
  <div className={s.appContainer}>
    <Header />
    <div className={s.appBlock}>
      <Tags />
      <Notes />
    </div>
    <Footer />
  </div>
);
