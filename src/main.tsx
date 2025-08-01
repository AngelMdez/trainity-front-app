import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// MSW setup
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser');
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
