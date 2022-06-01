import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);

reportWebVitals();
