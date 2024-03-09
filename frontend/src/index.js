import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from '../src/contexts/AuthProvider';
import { GlobalProvider } from './contexts/globalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

