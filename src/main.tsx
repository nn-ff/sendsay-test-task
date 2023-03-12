import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import { setupStore } from './store';
const store = setupStore();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

<div className="test">
  <div>
    <div></div>
  </div>
</div>;
