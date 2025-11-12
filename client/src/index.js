import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import './index.css';
import './flags.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
</React.StrictMode>
);