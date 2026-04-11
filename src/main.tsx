
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Guide Platform: Starting initialization...');
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Error: Could not find root DOM element');
  throw new Error("Could not find root element to mount application");
}

console.log('Root element found, mounting React application...');
const root = ReactDOM.createRoot(rootElement);
console.log('Creating React root and rendering App component...');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('React render complete - application ready.');
