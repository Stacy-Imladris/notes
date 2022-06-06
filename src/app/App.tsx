import { Parallax } from 'react-parallax';
import ReactTypingEffect from 'react-typing-effect';

import background from '../assets/images/3.jpg';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Notes } from '../components/Notes/Notes';
import { Tags } from '../components/Tags/Tags';

import s from './App.module.scss';

export const App = () => {
  const opacityValue = 0.3;
  const min = -10;
  const max = 10;

  return (
    <div className={s.appContainer}>
      <Header />
      <Parallax
        bgImage={background}
        strength={550}
        bgImageStyle={{
          width: '100vw',
          height: '70vh',
          objectFit: 'cover',
          opacity: opacityValue,
        }}
      >
        <div className={s.infoBlock}>
          The NOTES & TAGS application will help you properly store, use and
          search for notes. Here you can create a new note, delete an
          unnecessary one, edit current entries. You can find a note on any
          subject using the search field. If you want to filter notes by tag,
          just click on the required tag in the list.
          <div className={s.typing}>
            <ReactTypingEffect
              text="This app is built with react and love"
              speed={100}
            />
          </div>
          <div>(｡◕‿◕｡)</div>
        </div>
      </Parallax>
      <div className={s.appBlock}>
        <Tags />
        <Notes />
      </div>
      <Footer />
    </div>
  );
};
