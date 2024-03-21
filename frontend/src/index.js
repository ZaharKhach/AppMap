import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';
import { fetchPins } from './slices/globalSlice';

store.dispatch(fetchPins())

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(root)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

