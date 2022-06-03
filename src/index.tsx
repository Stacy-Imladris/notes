import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
