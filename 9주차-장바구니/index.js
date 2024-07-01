import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cart from './cart';
import { default as store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Cart />
  </Provider>
);
