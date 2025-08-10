// IMPORTANT: Create a .env.local file in the root of your project
// and add your Google Gemini API key to it like this:
// API_KEY=your_google_api_key_goes_here

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);