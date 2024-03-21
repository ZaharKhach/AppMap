import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';
import { fetchPins } from './slices/globalSlice';

store.dispatch(fetchPins())

const root = ReactDOM.createRoot(document.getElementById('root'));
// setTimeout(() => {
//   const el1 = document.querySelector('.mapboxgl-ctrl-bottom-left');
//   const el2 = document.querySelector('.mapboxgl-ctrl-attrib-inner')
//   el1.remove();
//   el2.remove();
// }, 100);
console.log(root)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

