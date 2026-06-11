import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore: Allow side-effect import of CSS when no type declarations are present
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);