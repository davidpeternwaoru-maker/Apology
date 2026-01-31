import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// Only attempt to mount the React application if the root element exists.
// This prevents the "Could not find root element" error when running the Vanilla JS version in index.html.
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log('Running in Vanilla JS mode.');
}